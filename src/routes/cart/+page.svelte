<script lang="ts">
	import { cartLineItemsStore, cartStore } from '$lib/stores/cart';
	import type { CartLine } from '$lib/types/cart';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import { Trash } from 'lucide-svelte';
	import { message } from 'sveltekit-superforms/server';

	const handleDelete = (line: CartLine) => {
		const product = $cartStore[line.productIndex];
		$cartStore[line.productIndex].orders = product.orders.filter((_, i) => i !== line.orderIndex);
		if (!$cartStore[line.productIndex].orders.length) {
			$cartStore = $cartStore.filter((_, i) => i !== line.productIndex);
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
		<div class="w-full overflow-x-auto">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<!-- <th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th> -->
						<th>Item</th>
						<th>Base Colour</th>
						<th>Faceplate Colour</th>

						<th>Left Logo</th>
						<th>Right Logo</th>
						<th>Price</th>

						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each $cartLineItemsStore as line}
						<tr>
							<!-- <th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th> -->
							<td>
								<div class="flex items-center gap-3">
									<div class="avatar">
										<div class="mask mask-squircle h-12 w-12">
											<enhanced:img src={line.product.imageUrl} class="" />
										</div>
									</div>
									<div>
										<div class="font-bold">{line.product.name}</div>
									</div>
								</div>
							</td>
							<td>
								{line.order.baseColour}
							</td>
							<td>
								{line.order.faceplateColour}
							</td>
							<td
								><div class="">{line.order.logoType.left}</div>
								<div class="text-sm opacity-50">{line.order.logoColour.left}</div></td
							>
							<td
								><div class="">{line.order.logoType.right}</div>
								<div class="text-sm opacity-50">{line.order.logoColour.right}</div></td
							>
							<td>{formatCurrency(line.product.startingPrice)}</td>
							<th>
								<button
									class="btn btn-ghost btn-sm"
									on:click={() => {
										handleDelete(line);
									}}><Trash size={18} /></button
								>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="mt-5 flex w-full flex-row justify-between">
			<div>
				<div class="">Total:</div>
				<p class="text-2xl font-bold">
					{formatCurrency($cartLineItemsStore.reduce((acc, c) => acc + c.product.startingPrice, 0))}
				</p>
			</div>
			<a href="/cart/checkout" class="btn btn-primary">Checkout</a>
		</div>
	{/if}
</div>
