import prisma from '$lib/prisma';
import type { Order } from '@prisma/client';

export const load = async () => {
	const orders = await prisma.order.findMany({
		select: {
			id: true,
			approved: true,
			cancelled: true,
			customer: true,
			lines: true,
			discountAmount: true
		},
		orderBy: { createdAt: 'desc' }
	});
	// https://github.com/prisma/prisma/issues/20627
	// due to the Decimal type, we need to parse the orders to JSON and back to JS objects
	// ... big oof but it works
	return { orders: JSON.parse(JSON.stringify(orders)) as Order[] };
};
