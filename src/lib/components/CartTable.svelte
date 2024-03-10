<script lang="ts">
	import { enhance } from '$app/forms';
	import Textbox from '$lib/components/Textbox.svelte';
	import { discountStore } from '$lib/stores/discount';
	import type { CartLine } from '$lib/types/cart';

	import { formatCurrency } from '$lib/utils/formatCurrency';
	import type { Discount } from '@prisma/client';
	import { Trash } from 'lucide-svelte';

	export let handleDelete: ((line: CartLine) => void) | undefined = undefined;
	export let cart: CartLine[];
	export let hideCheckout = false;
	export let discount: Discount | null = null;

	$: totalWithoutDiscount = cart.reduce((acc, c) => acc + c.product.startingPrice, 0);

	$: discountInternal = discount ?? $discountStore;

	$: discountAmount = discountInternal?.amount
		? discountInternal?.type === 'percentage'
			? totalWithoutDiscount * (discountInternal.amount / 100)
			: discountInternal?.amount
		: 0;
</script>

<div class="w-full overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
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
			{#each cart as line}
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
						{#if handleDelete}
							<button
								class="btn btn-ghost btn-sm"
								on:click={() => {
									if (handleDelete) {
										handleDelete(line);
									}
								}}><Trash size={18} /></button
							>
						{/if}
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="mt-5 flex w-full flex-col justify-between gap-4 md:flex-row md:items-end">
	<div>
		<div class="">Total:</div>
		<p class="text-2xl font-bold">
			{formatCurrency(totalWithoutDiscount - discountAmount)}
		</p>
	</div>
	{#if discountAmount}
		<div>
			<div class="">Discount:</div>
			<p class="text-2xl font-bold">
				{formatCurrency(discountAmount)}
			</p>
		</div>
	{/if}
	{#if !hideCheckout}
		<form
			method="POST"
			action="?/applyDiscount"
			use:enhance={() => {
				return async ({ update, result }) => {
					await update({ reset: false });
				};
			}}
			class="flex w-full flex-row items-center justify-center gap-2 md:max-w-80"
		>
			<Textbox
				type="text"
				name="discountCode"
				description="Discount"
				placeholder="Add a discount code"
				value=""
			/>
			<button type="submit" class="btn btn-primary self-end">Apply</button>
		</form>

		<a href="/cart/checkout" class="btn btn-primary">Checkout</a>
	{/if}
</div>
