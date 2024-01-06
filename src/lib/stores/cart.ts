import type { Cart, CartLine } from '$lib/types/cart';
import { derived, writable } from 'svelte/store';

const localStorageCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : undefined;

export const cartStore = writable<Cart>(localStorageCart ? JSON.parse(localStorageCart) : []);
cartStore.subscribe((cart) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('cart', JSON.stringify(cart));
	}
});

export const cartLineItemsStore = derived(cartStore, (cart) =>
	cart.reduce((acc, c, pI) => {
		return [
			...acc,
			...c.orders.map((o, oI) => ({
				product: c.product,
				order: o,
				productIndex: pI,
				orderIndex: oI
			}))
		];
	}, [] as CartLine[])
);
