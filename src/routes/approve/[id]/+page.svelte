<script lang="ts">
	import { enhance } from '$app/forms';
	import CartTable from '$lib/components/CartTable.svelte';

	export let data;
	let result;
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
	{#if !data.approved}
		<form
			method="POST"
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
			{#if loading}
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				<button type="submit" class="btn btn-primary">Approve</button>
			{/if}
		</form>
	{:else}
		APPROVED :)
	{/if}
</div>
