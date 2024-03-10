import prisma from '$lib/prisma';

export const load = async () => {
	const discounts = await prisma.discount.findMany({ orderBy: { code: 'asc' } });
	return { discounts };
};

export const actions = {
	add: async ({ request }) => {
		const formData = await request.formData();
		const code = formData.get('code')?.toString();

		if (code) {
			await prisma.discount.create({
				data: {
					code,
					amount: parseInt(formData.get('amount')?.toString() || '0'),
					type: formData.get('type')?.toString()
				}
			});
		}

		return { success: true };
	},
	trigger: async ({ request }) => {
		const formData = await request.formData();
		const code = formData.get('code')?.toString();

		if (code) {
			const discount = await prisma.discount.findUnique({ where: { code } });
			await prisma.discount.update({
				where: { code },
				data: { enabled: !discount?.enabled }
			});
		}

		return { success: true };
	}
};
