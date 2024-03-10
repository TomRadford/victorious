import prisma from '$lib/prisma.js';

export const actions = {
	applyDiscount: async ({ request }) => {
		const formData = await request.formData();

		const discountCode = formData.get('discountCode')?.toString();

		if (discountCode) {
			const discount = await prisma.discount.findUnique({
				where: { code: discountCode, enabled: true }
			});
			if (discount) {
				return { discount, fail: false };
			} else {
				return { discount: undefined, fail: true };
			}
		}
	}
};
