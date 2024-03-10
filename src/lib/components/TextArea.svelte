<script lang="ts">
	import type { AriaAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	export let description = '';
	export let placeholder = description;
	export let value: string;
	export let name: string;

	export let type: 'text' | 'email' | 'number' | 'password';
	export let error = '';
</script>

<div class="flex w-full flex-col gap-1">
	{#if description.length}
		<label for="textArea">
			<span class=" font-semibold">{description}</span>
		</label>
	{/if}

	<div class="relative">
		<textarea
			id="textArea"
			class="textarea textarea-bordered textarea-primary w-full pt-2 text-base"
			{placeholder}
			rows="5"
			bind:value
			{name}
			{...$$restProps}
		/>
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
