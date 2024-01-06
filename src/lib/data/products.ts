import TripleDriverImage from '/src/lib/assets/images/triple-driver.png?enhanced';
import DualDriverImage from '/src/lib/assets/images/dual-driver.png?enhanced';
import SingleDriverImage from '/src/lib/assets/images/single-driver.png?enhanced';
import type { Product } from '$lib/types/product';

/**
 * Switch out for DB at some point ;)
 */
export const productsData: Product[] = [
	{
		id: `triple-driver`,
		name: 'Triple Driver',
		description: `An ideal choice for musicians and mixing engineers seeking precision and accuracy in their audio experience. With a flat frequency response, three high-quality drivers, this IEM is designed to be as accurate as possible. Perfectly tuned for mixing excellence, experience pure, unaltered sound with every detail captured. The Triple Driver Custom IEM is your go-to choice for studio essentials.`,
		startingPrice: 4499,
		imageUrl: TripleDriverImage
	},
	{
		id: `dual-driver`,
		name: 'Dual Driver',
		description: `A tailored choice for musicians and audiophiles seeking a distinct mid-scooped frequency response. With two high-quality drivers, this IEM offers a balanced sound profile, highlighting both lows and highs while maintaining clarity in the mid-range. Ideal for musicians across genres and audiophiles appreciating nuanced sound, the Dual Driver Custom IEM delivers a captivating blend of precision and warmth.`,
		startingPrice: 3499,
		imageUrl: DualDriverImage
	},
	{
		id: `single-driver`,
		name: 'Single Driver',
		description: `Your go-to option for an exceptional audio experience without breaking the bank. With a single high-quality driver, this IEM delivers a balanced sound profile that outshines conventional universal in-ear monitors.Experience a level of audio quality that defies its price point. It is the ideal choice for those who seek affordability without compromising on sound excellence.`,
		startingPrice: 2499,
		imageUrl: SingleDriverImage
	}
];
