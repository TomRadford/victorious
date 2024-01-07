<script lang="ts">
	import Textbox from '$lib/components/Textbox.svelte';
	import TimelineItem from '$lib/components/TimelineItem.svelte';
	import { cartLineItemsStore, cartStore } from '$lib/stores/cart';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

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
			baseColour: line.order.baseColour,
			faceplateColour: line.order.faceplateColour,
			logoColourLeft: line.order.logoColour.left,
			logoColourRight: line.order.logoColour.right,
			logoTypeLeft: line.order.logoColour.left,
			logoTypeRight: line.order.logoColour.right,
			price: line.product.startingPrice
		}));
	}

	$: console.log($form.order);
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
				<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-3/5">
					<h1
						class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl"
					>
						How to order
					</h1>
				</div>
				<ul class="timeline timeline-vertical timeline-snap-icon mx-auto sm:px-32 lg:px-0">
					<TimelineItem prefix="Step 1" title="Design & Order">
						<a href="/products" class="font-bold">Design</a> your order, add it to your cart and
						fill out all the the info on this page. <br />
						We'll send you an invoice with all the details ✨
					</TimelineItem>
					<TimelineItem prefix="Step 2" title="Get impressions">
						Download the <a
							target="_blank"
							href="/ImpressionMoldingInstructions.pdf"
							class="font-bold">ear impression guide</a
						>
						and book an appointment at your nearest audiologist and get your impressions taken.
						<p class=" text-sm font-extralight">
							Note: Impression fees are paid separately directly to your audiologist.
						</p>
					</TimelineItem>
					<TimelineItem prefix="Step 3" title="Verify impressions">
						Take photos highlighted in the <a
							target="_blank"
							href="/ImpressionVerificationInstructions.pdf"
							class="font-bold">impression verification guide</a
						>
						and send them over to
						<a class="font-bold" href="mailto:ben@victoriousaudio.co.za"
							>ben@victoriousaudio.co.za</a
						>
						<p class=" text-sm font-extralight">
							Please allow up to 2 working days for a response.
						</p>
					</TimelineItem>
					<TimelineItem prefix="Step 4" title="Ship impressions">
						Once your impressions are verified, you will receive a packing slip as well as shipping
						details. It is critical that the slip is shipped with the impressions to make sure your
						impressions are processed correctly.
						<p class=" text-sm font-extralight">
							It is highly recommended that you use a shipping service that provides a tracking
							number (recommended services will be provided in the packing slip email). Victorious
							Audio does not take responsibility for lost or stolen shipments before a receipt has
							been confirmed by an official Victorious Audio representative.
						</p>
					</TimelineItem>
				</ul>
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
								>{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(
									$cartLineItemsStore.reduce((acc, c) => acc + c.product.startingPrice, 0)
								)}</span
							>
						</p>
					</div>

					<form method="POST" use:enhance class="flex w-full flex-col gap-2">
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
