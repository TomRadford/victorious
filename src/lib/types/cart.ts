import { colours, logoType } from '$lib/data/cart';
import type { Product } from './product';

type ColoursUnion = (typeof colours)[number];
type LogoTypeUnion = (typeof logoType)[number];

export type Order = {
	baseColour: ColoursUnion;
	faceplateColour: ColoursUnion;
	logoType: { left: LogoTypeUnion; right: LogoTypeUnion };
	logoColour: { left: ColoursUnion; right: ColoursUnion };
};
export type Cart = { product: Product; orders: Order[] }[];
export type CartLine = {
	product: Product;
	order: Order;
	productIndex?: number;
	orderIndex?: number;
};
