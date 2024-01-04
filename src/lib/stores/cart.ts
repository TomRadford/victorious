import type { Cart } from '$lib/types/cart';
import { writable } from 'svelte/store';

export const cartStore = writable<Cart>([]);
