import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { render } from 'svelte-email';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';

import { env } from '$env/dynamic/private';
import prisma from '$lib/prisma.js';

const lineSchema = z.object({
	productName: z.string(),
	productId: z.string(),
	price: z.number(),
	baseColour: z.string(),
	faceplateColour: z.string(),
	logoTypeLeft: z.string(),
	logoTypeRight: z.string(),
	logoColourLeft: z.string(),
	logoColourRight: z.string()
});

const orderSchema = z.object({
	name: z.string().min(5),
	email: z.string().email(),
	phone: z.string(),
	address1: z.string(),
	address2: z.string(),
	city: z.string(),
	province: z.string(),
	zipcode: z.string().min(4),
	order: lineSchema.array()
});

if (env.SENDGRID_API_KEY) {
	sendgrid.setApiKey(env.SENDGRID_API_KEY);
}

export const load = async () => {
	// Server API:
	const form = await superValidate(orderSchema);

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, orderSchema);
		console.log('POST', form.data.order);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return message(form, { form });
		}

		// Create DB Entries
		const existingCustomer = await prisma.customer.findUnique({
			where: { email: form.data.email }
		});
		if (!existingCustomer) {
			await prisma.customer.create({
				data: {
					email: form.data.email,
					phone: form.data.phone,
					name: form.data.name,
					address1: form.data.address1,
					address2: form.data.address2,
					city: form.data.city,
					province: form.data.province,
					zipcode: form.data.zipcode
				}
			});
		}

		const order = await prisma.order.create({
			data: { customerEmail: form.data.email }
		});

		const lines = await prisma.line.createMany({
			data: form.data.order.map((line) => ({
				productName: line.productName,
				productId: line.productId,
				price: line.price,
				baseColour: line.baseColour,
				faceplateColour: line.faceplateColour,
				logoTypeLeft: line.logoTypeLeft,
				logoTypeRight: line.logoTypeRight,
				logoColourLeft: line.logoColourRight,
				logoColourRight: line.logoColourRight,
				orderId: order.id
			}))
		});

		// Yep, return { form } here too
		return message(form, 'success');

		const customerEmailHtml = render({
			template: EmailTemplate
			// props: {
			// 	name: 'Svelte'
			// }
		});

		const customerOptions: MailDataRequired = {
			to: form.data.email,
			from: { name: 'Victorious Audio', email: 'mail@victoriousaudio.co.za' },
			// cc: 'ben@victoriousaudio.co.za',
			cc: 'tom@theradford.com',
			subject: 'New Order',
			html: customerEmailHtml
		};

		await sendgrid.send(customerOptions);
	}
};
