import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';
import CustomerOrderSentEmail from '$lib/emails/CustomerOrderSentEmail';
import AdminNewOrderEmail from '$lib/emails/AdminNewOrderEmail';

import { render } from '@react-email/render';
import { env } from '$env/dynamic/private';
import prisma from '$lib/prisma.js';
import type { Customer } from '@prisma/client';
import { error, redirect } from '@sveltejs/kit';

const authSchema = z.object({
	pass: z.string().min(5)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(authSchema);

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request, url, cookies }) => {
		const form = await superValidate(request, authSchema);

		if (!form.valid) {
			return message(form, { form });
		}

		if (form.data.pass !== env.PASS) {
			throw error(401, 'Wrong password');
		}

		cookies.set('pass', form.data.pass, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 14 // 2 weeks
		});

		const redir = url.searchParams.get('redir');

		throw redirect(307, redir ?? '/');
	}
};
