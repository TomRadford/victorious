<script lang="ts">
	import { formatCurrency } from '$lib/utils/formatCurrency.js';
	import { EditIcon } from 'lucide-svelte';

	export let data;
</script>

<div class="flex w-full flex-row justify-center overflow-y-hidden lg:items-start">
	<div>
		<h1
			class="my-4 text-center text-3xl font-bold leading-tight text-white opacity-75 md:text-left md:text-5xl"
		>
			Order List
		</h1>

		<div class="flex w-full overflow-x-auto">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<!-- <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th> -->
						<th>Id</th>
						<th>Customer</th>
						<th>Approved</th>
						<th>Items</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{#each data.orders as order}
						<tr class="">
							<td class=" font-bold"> <a href="/admin/orders/{order.id}">{order.id}</a></td>

							<td>{order.customer.name}</td>
							<td>{order.approved ? 'Yes' : 'No'}</td>
							<td>
								{order.lines.length}
								<!-- <td
							><div class="">{line.order.logoType.left}</div>
							<div class="text-sm opacity-50">{line.order.logoColour.left}</div></td
						>
						<td
							><div class="">{line.order.logoType.right}</div>
							<div class="text-sm opacity-50">{line.order.logoColour.right}</div></td
						> -->
							</td>
							<td
								>{formatCurrency(
									order.lines.reduce((acc, c) => acc + c.price, 0) - (order.discountAmount ?? 0)
								)}</td
							>
							<td> <a href="/admin/orders/{order.id}" class="btn"><EditIcon size="20" /></a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
