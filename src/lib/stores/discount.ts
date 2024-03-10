import type { Discount } from '@prisma/client';
import { writable } from 'svelte/store';

const localDiscountCart =
	typeof window !== 'undefined' ? localStorage.getItem('discount') : undefined;

export const discountStore = writable<Discount | undefined>(
	localDiscountCart ? JSON.parse(localDiscountCart) : undefined
);

discountStore.subscribe((discount) => {
	if (typeof window !== 'undefined') {
		if (discount) {
			localStorage.setItem('discount', JSON.stringify(discount));
		} else {
			localStorage.removeItem('discount');
		}
	}
});
