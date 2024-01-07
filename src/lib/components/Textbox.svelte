<script lang="ts">
	import type { AriaAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	export let description = '';
	export let value: string;
	export let name: string;

	export let type: 'text' | 'email' | 'number';
	export let error = '';
</script>

<div class="flex w-full flex-col gap-1">
	{#if description.length}
		<label for="text">
			<span class=" font-semibold">{description}</span>
		</label>
	{/if}

	<div class="relative">
		{#if type === 'email'}
			<input
				id="text"
				type="email"
				class="input input-bordered input-primary w-full"
				placeholder={description}
				bind:value
				{name}
				{...$$restProps}
			/>
		{:else if type === 'number'}
			<input
				id="text"
				type="number"
				class="input input-bordered input-primary w-full"
				placeholder={description}
				bind:value
				{name}
				{...$$restProps}
			/>
		{:else}
			<input
				id="text"
				type="text"
				class="input input-bordered input-primary w-full"
				placeholder={description}
				bind:value
				{name}
				{...$$restProps}
			/>
		{/if}
	</div>
	{#if error?.length}
		<div class=" font-light text-red-600" transition:slide>
			<p>{error}</p>
		</div>
	{/if}
</div>

<style lang="postcss">
	ul {
		transition-property: none;
	}
	.check {
		@apply absolute left-2 top-1/2 text-slate-600;
		translate: 0 calc(-50% + 1px);
	}
</style>
