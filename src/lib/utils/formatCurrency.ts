export const formatCurrency = (n: number) =>
	new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(n);
