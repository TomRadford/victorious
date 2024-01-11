<script lang="ts">
	import Textbox from '$lib/components/Textbox.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'error') {
				toast.error('Wrong passcode!');
			}
			if (result.type === 'success') {
				toast.success('Pass cookie set!');
			}
		}
	});
</script>

<svelte:head>
	<title>Victorious Audio | Checkout</title>
</svelte:head>
<div class="container mx-auto flex flex-col flex-wrap items-center">
	<div class="flex w-full flex-col gap-8 lg:flex-row">
		<div class="mx-auto lg:w-1/2">
			{#if data.alreadyAuthed}
				<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden">
					<h1
						class="my-4 text-left text-center text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl"
					>
						You're already authenticated 🔓
					</h1>
				</div>
			{:else}
				<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-2/5">
					<h1
						class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl"
					>
						Admin login
					</h1>
				</div>

				<form method="POST" use:enhance class="flex w-full flex-col gap-2">
					<Textbox
						type="password"
						name="pass"
						description="Pass token"
						aria-invalid={$errors.pass ? 'true' : undefined}
						bind:value={$form.pass}
						{...$constraints.pass}
						error={$errors.pass?.join(' ')}
					/>

					<div class="flex w-full justify-center pt-4">
						{#if !$delayed}
							<button class="btn btn-primary">Auth!</button>
						{:else}
							<span class="loading loading-spinner loading-lg"></span>
						{/if}
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>
