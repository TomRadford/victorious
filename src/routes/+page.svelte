<script>
</script>

<svelte:head>
	<title>Victorious Audio | Custom IEMS</title>
	<!-- Victorious Audio is a custom mould in-ear monitor company based in South Africa. Experience superior sound and comfort and an extremely affordable price. -->
	<meta charset="utf-8" />
	<meta
		name="description"
		content="Victorious Audio is a custom mould in-ear monitor company based in South Africa. Experience superior sound and comfort and an extremely affordable price."
	/>
	<meta
		name="google-site-verification"
		content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34="
	/>
</svelte:head>

<!--Main-->
<div class="">
	<div class="container mx-auto flex flex-col flex-wrap items-center md:flex-row">
		<!--Left Col-->
		<div class="flex w-full flex-col justify-center overflow-y-hidden lg:items-start xl:w-2/5">
			<h1
				class="my-4 text-center text-3xl font-bold leading-tight text-white opacity-75 md:text-left md:text-5xl"
			>
				Crafted Sound,<br /> Tailored for You
			</h1>
			<p class="mb-8 text-center text-base leading-normal md:text-left md:text-2xl">
				Precision Engineering, Personalized Experience
			</p>

			<div class="flex flex-wrap items-center justify-center gap-4 pt-4">
				<a href="/products" class="btn btn-outline btn-primary"> Products </a>
				<a href="/how-to-order" class="btn btn-outline btn-primary"> How to order </a>
				<a href="/terms-and-conditions" class="btn btn-outline btn-primary">
					Terms and Conditions
				</a>
			</div>
		</div>

		<!--Right Col-->
		<div class="w-full overflow-hidden p-12 xl:w-3/5">
			<div style:--tag="side-profile">
				<a href="/images/side-profile">
					<enhanced:img
						src="/src/lib/assets/images/side-profile.png"
						class="mx-auto w-full transform transition duration-700 ease-in-out hover:scale-105 md:w-4/5"
					/>
				</a>
			</div>
		</div>
	</div>
	<div class="container mx-auto flex flex-wrap items-center">
		<div class=" flex flex-col-reverse items-center gap-10 md:pt-16 xl:flex-row">
			<a href="/images/case">
				<div style:--tag="case">
					<enhanced:img
						src="/src/lib/assets/images/case.jpeg"
						class="mx-auto w-1/2 transform transition duration-700 ease-in-out hover:scale-105"
					/>
				</div>
			</a>
			<div class="w-full">
				<p class="pb-8 text-center font-bold text-blue-400 lg:pb-6">About us</p>

				<div
					class="fade-in mx-auto flex w-full max-w-lg justify-center pb-24 text-center md:justify-start lg:pb-0"
				>
					<p>
						Welcome to Victorious Audio, where passion meets precision in the pursuit of
						unparalleled sound. At Victorious Audio, we believe that everyone deserves an
						exceptional audio experience that is suited to them. Founded with a vision to make
						custom-mould in-ears viable for every musician. Our commitment to excellence is evident
						in the meticulous use of modern processes, including 3D scanning and SLA 3D printing,
						ensuring each in-ear monitor is a masterpiece of comfort, craftsmanship, and sonic
						perfection. What sets Victorious Audio apart is our dedication to making high-quality
						audio accessible to all. Proudly based in South Africa. Each pair of custom in-ear
						monitors is a testament to our commitment to quality and precision.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="container pt-36">
		<div class="card mx-auto w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="pb-1 text-center text-2xl font-bold">Contact us</h2>
				<div class="flex flex-col gap-3 text-center font-mono">
					<a href="https://wa.me/+27604922776">+27 60 492 2776</a>
					<a href="mailto:ben@victoriousaudio.co.za">ben@victoriousaudio.co.za</a>

					<p class=" text-xs">Based in Gqeberha, South Africa</p>
				</div>
			</div>
		</div>
	</div>
</div>
