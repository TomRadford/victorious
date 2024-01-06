<script lang="ts">
	import '../app.css';
	import LogoLarge from '$lib/components/LogoLarge.svelte';
	import { preparePageTransition } from '$lib/utils/pageTransition';
	import { cartStore } from '$lib/stores/cart';

	import { Toaster, toast } from 'svelte-sonner';

	preparePageTransition();
</script>

<Toaster toastOptions={{ duration: 5000 }} position="bottom-center" />

<div class="relative mx-2 min-h-screen md:mx-6">
	<!--Nav-->
	<div class="container mx-auto w-full">
		<div class="flex w-full items-center justify-between">
			<a
				class="flex h-36 w-36 items-center text-2xl font-bold text-white no-underline hover:no-underline lg:text-4xl"
				href="/"
			>
				<LogoLarge />
			</a>

			<div class="flex w-1/2 content-center justify-end">
				<a
					class="hover:text-underline relative inline-block h-14 w-14 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-vic-blue md:h-auto md:p-4"
					href="/cart"
				>
					{#if $cartStore.length}<div
							class="absolute right-4 top-3 h-2 w-2 rounded-full bg-red-600"
						></div>{/if}
					<svg fill="currentColor" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"
						><path
							d="M0.978822 0.356323L0.0209961 0.643671L3.12789 11H14.9999V4.5C14.9999 3.11929 13.8806 2 12.4999 2H1.47192L0.978822 0.356323Z"
						/><path
							clip-rule="evenodd"
							d="M5.5 12C4.67157 12 4 12.6716 4 13.5C4 14.3284 4.67157 15 5.5 15C6.32843 15 7 14.3284 7 13.5C7 12.6716 6.32843 12 5.5 12ZM5 13.5C5 13.2239 5.22386 13 5.5 13C5.77614 13 6 13.2239 6 13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5Z"
							fill-rule="evenodd"
						/><path
							clip-rule="evenodd"
							d="M12.5 12C11.6716 12 11 12.6716 11 13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5C14 12.6716 13.3284 12 12.5 12ZM12 13.5C12 13.2239 12.2239 13 12.5 13C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14C12.2239 14 12 13.7761 12 13.5Z"
							fill-rule="evenodd"
						/></svg
					>
				</a>
			</div>
		</div>
	</div>
	<div class="pb-32">
		<slot />
	</div>
	<!--Footer-->
	<div
		class="fade-in container absolute bottom-0 left-0 right-0 mx-auto flex justify-between pb-6 pt-16 text-center text-sm"
	>
		<div class="flex items-center">
			<a class=" text-gray-500 no-underline hover:no-underline" href="/"
				>&copy; Victorious Audio {new Date().getFullYear()}</a
			>
		</div>
		<div class="flex content-center justify-end">
			<a
				class="hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-vic-blue md:h-auto"
				href="https://www.instagram.com/victoriousaudio"
				target="_blank"
			>
				<svg class="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
					><path
						d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z"
					/></svg
				>
			</a>
			<a
				class="hover:text-underline inline-block h-10 transform p-2 pt-3 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-vic-blue md:h-auto"
				href="https://www.facebook.com/victoriousaudio"
				target="_blank"
			>
				<svg class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"
					></path>
				</svg>
			</a>
		</div>
	</div>
</div>
