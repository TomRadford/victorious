<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { Product } from '$lib/types/product';
	import TripleDriverImage from '/src/lib/assets/images/triple-driver.png?enhanced';
	import DualDriverImage from '/src/lib/assets/images/dual-driver.png?enhanced';
	import SingleDriverImage from '/src/lib/assets/images/single-driver.png?enhanced';

	/**
	 * Switch out for DB at some point ;)
	 */
	const productsData: Product[] = [
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
</script>

<svelte:head>
	<title>Victorious Audio | Products</title>
</svelte:head>

<div class="container mx-auto flex flex-col flex-wrap items-center">
	<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-2/5">
		<h1 class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl">
			Our Products
		</h1>
		<p class="mb-8 text-left text-sm leading-normal md:text-xl">
			We currently have <strong>{productsData.length}</strong> products available for custom order
		</p>
	</div>

	<div class="flex flex-wrap justify-center gap-8">
		{#each productsData as product}<ProductCard {product} />{/each}
	</div>
</div>
