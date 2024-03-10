import { env } from '$env/dynamic/private';
import { productsData } from '$lib/data/products.js';
import prisma from '$lib/prisma';
import type { CartLine } from '$lib/types/cart.js';
import { error } from '@sveltejs/kit';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';
import { render } from '@react-email/render';
import CustomerOrderCancelledEmail from '$lib/emails/CustomerOrderCancelledEmail.js';
import CustomerOrderConfirmedEmail from '$lib/emails/CustomerOrderConfirmedEmail.js';

if (env.SENDGRID_API_KEY) {
	sendgrid.setApiKey(env.SENDGRID_API_KEY);
}

export const load = async ({ params }) => {
	const order = await prisma.order.findUnique({
		where: { id: parseInt(params.id) },
		include: { lines: true, customer: true }
	});

	if (!order) {
		throw error(404, 'Order not found');
	}

	const res: CartLine[] = order.lines.map((line) => ({
		order: {
			baseColour: line.baseColour,
			faceplateColour: line.faceplateColour,
			logoType: { left: line.logoTypeLeft, right: line.logoTypeRight },
			logoColour: { left: line.logoColourLeft, right: line.logoColourRight }
		},
		product: {
			name: line.productName,
			id: line.productId,
			startingPrice: line.price,
			description: '',
			imageUrl: productsData.find((p) => p.id === line.productId)?.imageUrl ?? ''
		}
	})) as CartLine[]; //cheating here because its just to display this for internal review...

	return {
		cart: res,
		approved: order.approved,
		cancelled: order.cancelled,
		customer: order.customer,
		orderId: order.id
	};
};

export const actions = {
	approve: async ({ params }) => {
		await prisma.order.update({ where: { id: parseInt(params.id) }, data: { approved: true } });

		const order = await prisma.order.findUnique({
			where: { id: parseInt(params.id) },
			include: { lines: true, customer: true }
		});
		if (order && order?.customer && order?.lines) {
			const emailHtml = render(
				CustomerOrderConfirmedEmail({ customer: order?.customer, lines: order.lines, order: order })
			);

			const customerEmailOptions: MailDataRequired = {
				to: order.customerEmail,
				from: { name: 'Victorious Audio', email: 'mail@victoriousaudio.co.za' },
				replyTo: env.ADMIN_EMAIL,
				cc: env.ADMIN_EMAIL,
				subject: `Your Order (VA${order.id.toString().padStart(4, '0')}) has been confirmed`,
				html: emailHtml
			};
			await sendgrid.send(customerEmailOptions);
		}

		return { success: true };
	},
	cancel: async ({ params }) => {
		await prisma.order.update({ where: { id: parseInt(params.id) }, data: { cancelled: true } });

		const order = await prisma.order.findUnique({
			where: { id: parseInt(params.id) },
			include: { lines: true, customer: true }
		});
		if (order && order?.customer && order?.lines) {
			const emailHtml = render(
				CustomerOrderCancelledEmail({ customer: order?.customer, lines: order.lines, order: order })
			);

			const customerEmailOptions: MailDataRequired = {
				to: order.customerEmail,
				from: { name: 'Victorious Audio', email: 'mail@victoriousaudio.co.za' },
				replyTo: env.ADMIN_EMAIL,
				cc: env.ADMIN_EMAIL,
				subject: `Cancelled Order (VA${order.id.toString().padStart(4, '0')})`,
				html: emailHtml
			};
			await sendgrid.send(customerEmailOptions);
		}

		return { success: true };
	}
};
