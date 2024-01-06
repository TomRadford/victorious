<script lang="ts">
	import type { Product } from '$lib/types/product';
	import { fade } from 'svelte/transition';
	import { cartStore } from '$lib/stores/cart';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { productsData } from '$lib/data/products.js';
	import { Select } from 'bits-ui';
	import { Check, Palette, CaretUpDown } from 'phosphor-svelte';
	import { colours } from '$lib/data/cart';
	import { flyAndScale } from '$lib/utils/flyAndScale';
	import type { Order } from '$lib/types/cart';

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
	};

	const coloursList = colours.map((c) => ({ label: c, value: c }));

	$: console.log(newOrder);
</script>

<!-- Bind me to show! -->

<div class="modal modal-open z-10" out:fade={{ duration: 200 }}>
	<div class="modal-box">
		{#if !product}
			<h3 class="text-lg font-bold">No product found 🫢</h3>
			<div class="modal-action">
				<a class="btn" href="/products">Close</a>
			</div>
		{:else}
			<h3 class="pb-4 text-lg">
				Select your options for the <span class="font-bold">{product.name}</span>
			</h3>

			<form class="flex flex-col">
				<label for="baseColour" class="label">Base Colour</label>
				<Select.Root
					highlightOnHover
					items={coloursList}
					selected={{ value: newOrder.baseColour, label: newOrder.baseColour }}
					onSelectedChange={(s) => {
						newOrder.baseColour = s?.value;
					}}
				>
					<Select.Trigger
						class="input input-bordered input-primary flex w-full flex-row items-center font-medium"
						aria-label="Select a theme"
					>
						<Select.Value class="text-sm" placeholder="Select a theme" />
						<CaretUpDown class="text-muted-foreground  ml-auto" />
					</Select.Trigger>

					<Select.Content
						class="z-20 h-60 overflow-scroll rounded-box bg-base-100 pt-2 shadow"
						transition={flyAndScale}
						sideOffset={8}
						fitViewport={true}
						sameWidth
						asChild
					>
						{#each coloursList as item}
							<Select.Item
								class="flex h-10 w-full items-center rounded-box px-4 text-sm font-medium hover:cursor-pointer hover:bg-slate-600"
								value={item.value}
								label={item.label}
							>
								{item.label}
								<Select.ItemIndicator class="ml-auto">
									<Check />
								</Select.ItemIndicator>
							</Select.Item>
						{/each}
					</Select.Content>
					<Select.Input name="baseColour" />
				</Select.Root>

				<label for="name">Name</label>
				<input type="text" name="name" />

				<label for="email">E-mail</label>
				<input type="email" name="email" />

				<div class="modal-action">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn btn-primary" on:click={addToCart}>Add and keep shopping</button>
					<button class="btn btn-primary" on:click={addToCart}>Go to cart</button>
				</div>
			</form>
		{/if}
	</div>
</div>
