<script lang="ts">
	import type { Product } from '$lib/types/product';
	import { fade } from 'svelte/transition';
	import { cartStore } from '$lib/stores/cart';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { productsData } from '$lib/data/products.js';
	import { colours, logoType } from '$lib/data/cart';
	import type { Order } from '$lib/types/cart';
	import Combobox from '$lib/components/Combobox.svelte';
	import CrownLogo from '/src/lib/assets/images/crown-logo.png?enhanced';
	import VALogo from '/src/lib/assets/images/VA-logo.png?enhanced';
	import { CircleOff, XCircle } from 'lucide-svelte';

	const product: Product | undefined = productsData.find((p) => p.id === $page.params.id);

	$: existingIndex = $cartStore.findIndex((p) => p.product.id === product?.id);

	let newOrder: Order = {
		baseColour: 'Clear',
		faceplateColour: 'Clear',
		logoColour: { left: 'Clear', right: 'Clear' },
		logoType: { left: 'VA', right: 'Crown' }
	};

	const addToCart = () => {
		if (!product) {
			return;
		}
		let message: string;
		if (existingIndex === -1) {
			$cartStore = [...$cartStore, { product, orders: [newOrder] }];
			message = `Added ${product.name} to cart!`;
		} else {
			$cartStore[existingIndex].orders = [...$cartStore[existingIndex].orders, newOrder];
			message = `Added another ${product.name} to cart!`;
		}
		toast.dismiss('added');

		toast.success(message, {
			action: {
				label: 'Cart',
				onClick: () => {
					goto('/cart');
				}
			},
			id: 'added'
		});

		goto('/products');
	};

	const coloursList = colours.map((c) => ({ value: c }));
	const logoList = logoType.map((c) => ({ value: c }));
</script>

<!-- Bind me to show! -->

<div class="modal modal-open no-animation z-10" out:fade={{ duration: 200 }}>
	<div class="modal-box no-animation">
		{#if !product}
			<div class="flex w-full items-center justify-between">
				<h3 class=" text-lg">No product found! 🫢</h3>

				<a href="/products"><XCircle /></a>
			</div>
		{:else}
			<button on:click={addToCart}>ayy</button>
			<div class="mb-4 flex w-full items-center justify-between border-b border-b-slate-700 pb-4">
				<h3 class=" text-lg">
					Select your options for the <span class="font-bold">{product.name}</span>
				</h3>

				<a href="/products"><XCircle /></a>
			</div>

			<div class="flex flex-col">
				<Combobox
					bind:optionValue={newOrder.baseColour}
					options={coloursList}
					description="Base Colour"
					canAdd
				/>
				<Combobox
					bind:optionValue={newOrder.baseColour}
					options={coloursList}
					description="Faceplate Colour"
					canAdd
				/>
				<div class="flex w-full gap-3">
					<Combobox
						bind:optionValue={newOrder.logoType.left}
						options={logoList}
						description="Left Ear Logo"
					/>

					<Combobox
						bind:optionValue={newOrder.logoType.right}
						options={logoList}
						description="Right Ear Logo"
					/>
				</div>
				<div class="flex w-full">
					<div class="w-1/2">
						{#if newOrder.logoType.left === 'Crown'}
							<enhanced:img src={CrownLogo} class="mx-auto" />
						{:else if newOrder.logoType.left === 'VA'}
							<enhanced:img src={VALogo} class="mx-auto" />
						{:else}
							<div class="flex h-full justify-center">
								<CircleOff class="mx-auto my-auto" size={130} />
							</div>
						{/if}
					</div>
					<div class="w-1/2">
						{#if newOrder.logoType.right === 'Crown'}
							<enhanced:img src={CrownLogo} class="mx-auto" />
						{:else if newOrder.logoType.right === 'VA'}
							<enhanced:img src={VALogo} class="mx-auto" />
						{:else}
							<div class="flex h-full justify-center">
								<CircleOff class="mx-auto my-auto" size={130} />
							</div>
						{/if}
					</div>
				</div>
				<div class="flex w-full gap-3">
					<Combobox
						bind:optionValue={newOrder.logoColour.left}
						options={coloursList}
						description="Left Ear Logo Colour"
					/>

					<Combobox
						bind:optionValue={newOrder.logoColour.right}
						options={coloursList}
						description="Right Ear Logo Colour"
					/>
				</div>

				<div class="modal-action">
					<button class="btn btn-primary" on:click={addToCart}>Add to cart</button>
				</div>
			</div>
		{/if}
	</div>
</div>
