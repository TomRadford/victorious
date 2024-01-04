<script>
	import { page } from '$app/stores';
</script>

<div class="container mx-auto flex flex-row flex-wrap items-center">
	<!--Left Col-->
	<div class="mx-auto flex w-2/5 flex-col justify-center overflow-y-hidden">
		<h1 class="my-4 text-left text-3xl font-bold leading-tight text-white opacity-75 md:text-5xl">
			Error {$page.status}
		</h1>
		<p class="mb-8 text-sm leading-normal md:text-xl">{$page.error?.message}</p>
	</div>
</div>
