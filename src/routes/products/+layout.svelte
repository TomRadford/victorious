<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { productsData } from '$lib/data/products';
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
<!-- This is used to render the designer as a faux modal page 🤓 -->
<slot />
