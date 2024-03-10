<script lang="ts">
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	export let description = '';
	export let optionValue: string;
	export let canAdd = false;
	export let name = '';

	$: {
		if (!$selected) {
			$selected = toComboboxOption({ value: optionValue });
		} else {
			optionValue = $selected.value.value;
		}
	}

	type Option = {
		value: string;
		description?: string;
		disabled?: boolean;
		new?: true;
	};

	export let options: Option[];

	const toComboboxOption = (option: Option): ComboboxOptionProps<Option> => ({
		value: option,
		label: option?.description ?? option.value,
		disabled: option?.disabled ?? false
	});

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Option>({
		forceVisible: true,
		portal: undefined,
		name,
		preventScroll: true,
		positioning: { placement: 'bottom', sameWidth: true, fitViewport: true, flip: false }
	});

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: filteredOptions = $touchedInput
		? options.filter(({ description, value: title }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return (
					title.toLowerCase().includes(normalizedInput) ||
					description?.toLowerCase().includes(normalizedInput)
				);
			})
		: options;
	let filteredOptionsWithNew: Option[];
	$: filteredOptionsWithNew = canAdd
		? filteredOptions.find((v) => v.value.toLowerCase() === $inputValue.toLowerCase())
			? filteredOptions
			: [{ value: $inputValue, new: true }, ...filteredOptions]
		: filteredOptions;
</script>

<div class="flex w-full flex-col gap-1">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	{#if description.length}
		<label use:melt={$label}>
			<span class="label">{description}</span>
		</label>
	{/if}

	<div class="relative">
		<input
			use:melt={$input}
			class=" input input-bordered input-primary w-full"
			placeholder={description}
		/>
		<!-- <div class="text-magnum-900 absolute right-2 top-1/2 z-10 -translate-y-1/2">
			{#if $open}
				<ChevronUp class="square-4" />
			{:else}
				<ChevronDown class="square-4" />
			{/if}
		</div> -->
	</div>
</div>
{#if $open}
	<ul
		class=" dropdown-content z-20 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="flex max-h-full flex-col gap-0 gap-2 overflow-y-auto" tabindex="0">
			{#each filteredOptionsWithNew as opt, index (index)}
				<li
					use:melt={$option(toComboboxOption(opt))}
					class=" data-[highlighted]:text-magnum-900 relative cursor-pointer scroll-my-2 rounded-md py-2
          pl-4
          pr-4 data-[highlighted]:bg-slate-800
            data-[disabled]:opacity-50 {$isSelected(opt) ? 'bg-slate-800' : ''}"
				>
					<div class="pl-4">
						<span class="font-medium">{opt.value}</span>
						{#if opt.description?.length}
							<span class="block text-sm opacity-75">{opt.description}</span>
						{/if}
						{#if opt.new}<div class="badge badge-primary badge-outline">Custom</div>{/if}
					</div>
				</li>
			{:else}
				<li
					class=" relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4
                pr-4"
				>
					No results found
				</li>
			{/each}
		</div>
	</ul>
{/if}

<style lang="postcss">
	ul {
		transition-property: none;
	}
	.check {
		@apply absolute left-2 top-1/2 text-slate-600;
		translate: 0 calc(-50% + 1px);
	}
</style>
