import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';
import CustomerOrderSentEmail from '$lib/emails/CustomerOrderSentEmail';
import AdminNewOrderEmail from '$lib/emails/AdminNewOrderEmail';

import { render } from '@react-email/render';
import { env } from '$env/dynamic/private';
import prisma from '$lib/prisma.js';
import type { Customer } from '@prisma/client';
import { error } from '@sveltejs/kit';

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

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return message(form, { form });
		}

		// Create DB Entries
		const existingCustomer = await prisma.customer.findUnique({
			where: { email: form.data.email }
		});
		let newCustomer: Customer | undefined;
		if (!existingCustomer) {
			newCustomer = await prisma.customer.create({
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
		} else {
			newCustomer = undefined;
		}

		const customer = existingCustomer ?? newCustomer;

		const order = await prisma.order.create({
			data: { customerEmail: form.data.email }
		});

		const lines = await prisma.$transaction(
			form.data.order.map((line) =>
				prisma.line.create({
					data: {
						productName: line.productName,
						price: line.price,
						baseColour: line.baseColour,
						faceplateColour: line.faceplateColour,
						logoTypeLeft: line.logoTypeLeft,
						logoTypeRight: line.logoTypeRight,
						logoColourLeft: line.logoColourRight,
						logoColourRight: line.logoColourRight,
						productId: line.productId,
						orderId: order.id
					}
				})
			)
		);
		if (customer && lines && order) {
			const customerEmailHtml = render(CustomerOrderSentEmail({ customer, lines, order }));

			const customerEmailOptions: MailDataRequired = {
				to: form.data.email,
				from: { name: 'Victorious Audio', email: 'mail@victoriousaudio.co.za' },

				// cc: 'tom@theradford.com',
				subject: `Your Order (VA${order.id.toString().padStart(4, '0')})`,
				html: customerEmailHtml
			};

			await sendgrid.send(customerEmailOptions);

			const approveUrl = `https://victoriousaudio.co.za/approve/${env.PASS}/${order.id}`;
			const adminEmailHtml = render(AdminNewOrderEmail({ customer, lines, order, approveUrl }));

			const adminEmailOptions: MailDataRequired = {
				to: 'ben@victoriousaudio.co.za',
				from: { name: 'Victorious Audio', email: 'mail@victoriousaudio.co.za' },
				subject: `NEW ORDER (VA${order.id.toString().padStart(4, '0')})`,
				html: adminEmailHtml
			};

			await sendgrid.send(adminEmailOptions);

			// Yep, return { form } here too
			return message(form, 'success');
		} else {
			throw error(500, 'Database error');
		}
	}
};
