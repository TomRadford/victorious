<script lang="ts">
	import Instructions from '$lib/components/Instructions.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import Textbox from '$lib/components/Textbox.svelte';
	import { cartLineItemsStore, cartStore } from '$lib/stores/cart';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { enhance as svelteEnhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	// Client API:
	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				$cartStore = [];
			}
		}
	});

	$: {
		$form.order = $cartLineItemsStore.map((line) => ({
			productName: line.product.name,
			productId: line.product.id,
			baseColour: line.order.baseColour,
			faceplateColour: line.order.faceplateColour,
			logoColourLeft: line.order.logoColour.left,
			logoColourRight: line.order.logoColour.right,
			logoTypeLeft: line.order.logoType.left,
			logoTypeRight: line.order.logoType.right,
			price: line.product.startingPrice
		}));
	}
</script>

<svelte:head>
	<title>Victorious Audio | Checkout</title>
</svelte:head>
<div class="container mx-auto flex flex-col flex-wrap items-center">
	{#if $message === 'success'}
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Order submitted! 🥳</h1>
			<p class="py-6">
				Your order is now being processed, please check your email for further details.
			</p>
			<div class="flex w-full justify-center">
				<a href="/" class="btn btn-primary">Home</a>
			</div>
		</div>
	{:else}
		<div class="flex w-full flex-col gap-8 lg:flex-row">
			<div class="lg:w-1/2">
				<Instructions />
			</div>
			<div class="lg:w-1/2">
				{#if !$cartLineItemsStore.length}
					<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-2/5">
						<h1
							class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl"
						>
							Order form
						</h1>
						<p class="mb-8 text-left text-sm leading-normal md:text-xl">
							Please <a href="/products" class="font-bold">add some items</a> to your cart
						</p>
					</div>
				{:else}
					<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-2/5">
						<h1
							class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl"
						>
							Order form
						</h1>
						<p class="mb-8 text-left text-sm leading-normal md:text-xl">
							You are about to order <a href="/cart" class="font-bold"
								>{$cartLineItemsStore.length} items</a
							>
							for
							<span class="font-bold"
								>{formatCurrency(
									$cartLineItemsStore.reduce((acc, c) => acc + c.product.startingPrice, 0)
								)}</span
							>
						</p>
					</div>

					{#if data.isAdmin}
						<form
							method="POST"
							action="?/details"
							use:svelteEnhance={(f) => {
								return async ({ update, result }) => {
									try {
										let tId = toast.loading('Loading');
										await update({ reset: false });

										if (result.type === 'success') {
											$form.name = result.data.name;
											$form.email = result.data.email;
											$form.phone = result.data.phone;
											$form.address1 = result.data.address1;
											$form.address2 = result.data.address2;
											$form.city = result.data.city;
											$form.province = result.data.province;
											$form.zipcode = result.data.zipcode;
										}
										toast.dismiss(tId);
										toast.success('Restored user details');
									} catch (e) {
										toast.dismiss(tId);
										toast.error('User does not exist');
									}

									// console.log(data);
									// console.log(f.formData.get('name'));
								};
							}}
							class="mb-4 flex w-full flex-col gap-2 rounded bg-slate-700 p-4"
						>
							<Textbox type="text" name="email" description="Restore user by email" value="" />
						</form>
					{/if}

					<form method="POST" action="?/order" use:enhance class="flex w-full flex-col gap-2">
						<Textbox
							type="text"
							name="name"
							description="Full name"
							aria-invalid={$errors.name ? 'true' : undefined}
							bind:value={$form.name}
							{...$constraints.name}
							error={$errors.name?.join(' ')}
						/>

						<Textbox
							description="Email"
							type="email"
							name="email"
							aria-invalid={$errors.email ? 'true' : undefined}
							bind:value={$form.email}
							{...$constraints.email}
							error={$errors.email?.join(' ')}
						/>
						<Textbox
							description="Phone"
							type="text"
							name="phone"
							aria-invalid={$errors.phone ? 'true' : undefined}
							bind:value={$form.phone}
							{...$constraints.phone}
							error={$errors.phone?.join(' ')}
						/>
						<Textbox
							description="Address line 1"
							type="text"
							name="address1"
							aria-invalid={$errors.address1 ? 'true' : undefined}
							bind:value={$form.address1}
							{...$constraints.address1}
							error={$errors.address1?.join(' ')}
						/>
						<Textbox
							description="Address line 2"
							type="text"
							name="address2"
							aria-invalid={$errors.address2 ? 'true' : undefined}
							bind:value={$form.address2}
							{...$constraints.address2}
							error={$errors.address2?.join(' ')}
						/>
						<Textbox
							description="City"
							type="text"
							name="City"
							aria-invalid={$errors.email ? 'true' : undefined}
							bind:value={$form.city}
							{...$constraints.city}
							error={$errors.city?.join(' ')}
						/>
						<Textbox
							description="Province"
							type="text"
							name="province"
							aria-invalid={$errors.province ? 'true' : undefined}
							bind:value={$form.province}
							{...$constraints.province}
							error={$errors.province?.join(' ')}
						/>
						<Textbox
							description="Zip code"
							type="text"
							name="zipcode"
							aria-invalid={$errors.zipcode ? 'true' : undefined}
							bind:value={$form.zipcode}
							{...$constraints.zipcode}
							error={$errors.zipcode?.join(' ')}
						/>
						<TextArea
							description="Order Notes"
							type="text"
							name="zipcode"
							aria-invalid={$errors.note ? 'true' : undefined}
							bind:value={$form.note}
							{...$constraints.note}
							error={$errors.note?.join(' ')}
							placeholder="Any notes for your order"
						/>

						<div class="flex w-full justify-center pt-4">
							{#if !$delayed}
								<button class="btn btn-primary">Order!</button>
							{:else}
								<span class="loading loading-spinner loading-lg"></span>
							{/if}
						</div>
					</form>
				{/if}
			</div>
		</div>
	{/if}
</div>
