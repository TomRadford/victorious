<script lang="ts">
	import { enhance } from '$app/forms';
	import CartTable from '$lib/components/CartTable.svelte';

	export let data;
	let loading = false;
</script>

<svelte:head><title>Order: VA{data.orderId.toString().padStart(4, '0')}</title></svelte:head>

<div class="container mx-auto flex max-w-5xl flex-col flex-wrap items-center">
	<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-2/5">
		<h1 class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl">
			Customer Order: VA{data.orderId.toString().padStart(4, '0')}
		</h1>
		<div>
			{data.customer.name}
			({data.customer.email})
		</div>
	</div>
	<CartTable cart={data.cart} hideCheckout />
	<div class="flex gap-4">
		{#if !data.approved && !data.cancelled}
			<form
				method="POST"
				action="?/approve"
				class="flex w-full flex-col items-center gap-24"
				use:enhance={() => {
					loading = true;
					return async ({ update, result }) => {
						console.log(result);
						await update({ reset: false });
						loading = false;
					};
				}}
			>
				{#if !loading}
					<button type="submit" class="btn btn-primary">Approve</button>
				{/if}
			</form>
		{/if}
		{#if !data.cancelled && !data.approved}
			<form
				method="POST"
				action="?/cancel"
				class="flex w-full flex-col items-center gap-24"
				use:enhance={() => {
					loading = true;
					return async ({ update, result }) => {
						console.log(result);
						await update({ reset: false });
						loading = false;
					};
				}}
			>
				{#if !loading}
					<button type="submit" class="btn btn-error">Cancel</button>
				{/if}
			</form>
		{/if}
	</div>
	{#if loading}
		<span class="loading loading-spinner loading-md"></span>
	{/if}
	{#if data.approved}
		APPROVED :)
	{:else if data.cancelled}
		CANCELLED :(
	{/if}
</div>
