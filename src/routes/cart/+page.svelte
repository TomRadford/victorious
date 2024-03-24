<script lang="ts">
	import { enhance } from '$app/forms';
	import CartTable from '$lib/components/CartTable.svelte';
	import Textbox from '$lib/components/Textbox.svelte';
	import { cartLineItemsStore, cartStore } from '$lib/stores/cart';
	import { discountStore } from '$lib/stores/discount';
	import type { CartLine } from '$lib/types/cart';
	import { toast } from 'svelte-sonner';

	export let form;

	$: {
		if (form?.discount && !form?.fail) {
			toast.success(`Discount code ${form?.discount?.code} applied`);
			$discountStore = form?.discount;
		} else if (form?.fail) {
			toast.error("Discount code doesn't exist");
			$discountStore = undefined;
		}
	}

	const handleDelete = (line: CartLine) => {
		if (typeof line.orderIndex === 'number' && typeof line.productIndex === 'number') {
			const product = $cartStore[line.productIndex];
			$cartStore[line.productIndex].orders = product.orders.filter((_, i) => i !== line.orderIndex);
			if (!$cartStore[line.productIndex].orders.length) {
				$cartStore = $cartStore.filter((_, i) => i !== line.productIndex);
			}
		}
	};
</script>

<svelte:head>
	<title>Victorious Audio | Cart</title>
</svelte:head>
<div class="container mx-auto flex max-w-5xl flex-col flex-wrap items-center">
	<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-2/5">
		<h1 class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl">
			Your cart
		</h1>
		<p class="mb-8 text-left text-sm leading-normal md:text-xl">
			You have <strong>{$cartLineItemsStore.length}</strong> items in your cart, order more
			<a class=" font-semibold" href="/products">here</a>
		</p>
	</div>
	{#if $cartLineItemsStore.length}
		<CartTable cart={$cartLineItemsStore} {handleDelete} />
	{/if}
</div>
