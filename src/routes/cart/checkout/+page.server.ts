import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';
import Email from '$lib/emails/Email';
import { render } from '@react-email/render';

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

		const emailHtml = render(Email({}));

		const customerOptions: MailDataRequired = {
			to: form.data.email,
			from: { name: 'Victorious Audio', email: 'mail@victoriousaudio.co.za' },
			// cc: 'ben@victoriousaudio.co.za',
			// cc: 'tom@theradford.com',
			subject: 'New Order',
			html: emailHtml
		};

		await sendgrid.send(customerOptions);

		// Yep, return { form } here too
		return message(form, 'success');

		//
	}
};
