<script lang="ts">
	import { goto } from '$app/navigation';
	import { cartStore } from '$lib/stores/cart';
	import type { Product } from '$lib/types/product';
	import { toast } from 'svelte-sonner';
	export let product: Product;

	$: existingIndex = $cartStore.findIndex((p) => p.product.id === product.id);

	const addToCart = () => {
		let message: string;
		if (existingIndex === -1) {
			$cartStore = [...$cartStore, { product, qty: 1 }];
			message = `Added ${product.name} to cart!`;
		} else {
			$cartStore[existingIndex].qty = $cartStore[existingIndex].qty + 1;
			message = `Added another ${product.name} to cart!`;
		}
		toast.dismiss('added');
		toast.success(message, {
			action: {
				label: 'Cart',
				onClick: () => {
					goto('/cart');
				}
			},
			id: 'added'
		});
	};
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
			<button on:click={addToCart} class="btn btn-primary"
				>{#if existingIndex === -1}
					Order now!{:else}Add another ({$cartStore[existingIndex].qty}){/if}</button
			>
		</div>
	</div>
</div>
