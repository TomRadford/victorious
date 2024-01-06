<script lang="ts">
	import { goto } from '$app/navigation';
	import { cartStore } from '$lib/stores/cart';
	import type { Product } from '$lib/types/product';
	export let product: Product;

	$: existingIndex = $cartStore.findIndex((p) => p.product.id === product.id);
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<figure>
		<enhanced:img
			src={product.imageUrl}
			class="mx-auto w-full -rotate-6 transform transition duration-700 ease-in-out hover:rotate-6 hover:scale-105 md:w-4/5"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title">
			{product.name}
			<div class="badge badge-secondary">NEW</div>
		</h2>
		<p>{product.description}</p>
		<h4 class="text-3xl font-bold">
			{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(
				product.startingPrice
			)}
		</h4>
		<div class="card-actions justify-center pt-10">
			<button
				on:click={() => {
					goto(`/products/add/${product.id}`, { noScroll: true });
				}}
				class="btn btn-primary"
				>{#if existingIndex === -1}
					Order now!{:else}Add another ({$cartStore[existingIndex].orders.length}){/if}</button
			>
		</div>
	</div>
</div>
