import prisma from '$lib/prisma';

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
	return { orders };
};
