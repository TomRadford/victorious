<script lang="ts">
	import type { CartLine } from '$lib/types/cart';

	import { formatCurrency } from '$lib/utils/formatCurrency';
	import { Trash } from 'lucide-svelte';

	export let handleDelete: ((line: CartLine) => void) | undefined = undefined;
	export let cart: CartLine[];
	export let hideCheckout = false;
</script>

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
<div class="mt-5 flex w-full flex-row justify-between">
	<div>
		<div class="">Total:</div>
		<p class="text-2xl font-bold">
			{formatCurrency(cart.reduce((acc, c) => acc + c.product.startingPrice, 0))}
		</p>
	</div>
	{#if !hideCheckout}
		<a href="/cart/checkout" class="btn btn-primary">Checkout</a>
	{/if}
</div>
