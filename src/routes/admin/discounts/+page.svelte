<script lang="ts">
	import { enhance } from '$app/forms';
	import Combobox from '$lib/components/Combobox.svelte';
	import Textbox from '$lib/components/Textbox.svelte';
	import { formatCurrency } from '$lib/utils/formatCurrency.js';
	import { EditIcon, EyeIcon } from 'lucide-svelte';

	export let data;
	let adding = false;
</script>

<div class="flex w-full flex-row items-center justify-center overflow-y-hidden lg:items-start">
	<div>
		<h1
			class="my-4 text-center text-3xl font-bold leading-tight text-white opacity-75 md:text-left md:text-5xl"
		>
			Discount List
		</h1>

		<div class="flex w-full overflow-x-auto">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<th>Code</th>
						<th>Type</th>
						<th>Amount</th>
						<th>Enabled</th>
					</tr>
				</thead>
				<tbody>
					{#each data.discounts as discount}
						<tr class={`${discount.enabled ? 'text-green-500' : 'text-red-500'}`}>
							<td class=" font-bold"> {discount.code}</td>

							<td>{discount.type}</td>
							<td
								>{discount.type === 'percentage'
									? `${discount.amount}%`
									: formatCurrency(discount.amount)}</td
							>

							<td>{discount.enabled ? 'ENABLED' : 'DISABLED'}</td>
							<td>
								<form
									action="?/trigger"
									method="POST"
									use:enhance={() => {
										return async ({ update, result }) => {
											await update({ reset: false });
										};
									}}
								>
									<input hidden type="text" name="code" value={discount.code} />
									<button type="submit" class="btn btn-primary btn-sm">
										{discount.enabled ? 'Disable' : 'Enable'}
									</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="mt-10">
			<h3
				class="text-center text-2xl font-semibold leading-tight text-white opacity-75 md:text-left"
			>
				Add new discount
			</h3>
			<form
				method="POST"
				action="?/add"
				class="mt-4 flex w-full flex-col items-center gap-3"
				use:enhance={() => {
					adding = true;
					return async ({ update, result }) => {
						await update({ reset: false });
						adding = false;
					};
				}}
			>
				<Textbox type="text" value="" label="Code" description="Code" name="code" />
				<Textbox type="number" value="" label="Amount" description="Amount" name="amount" />
				<Combobox
					description="Type"
					optionValue="percentage"
					options={[
						{ value: 'percentage', description: '% discount' },
						{ value: 'number', description: 'number discount' }
					]}
				/>

				{#if adding}
					<span class="loading loading-spinner loading-md"></span>
				{:else}
					<button type="submit" class="btn btn-primary">New Discount</button>
				{/if}
			</form>
		</div>
	</div>
</div>
