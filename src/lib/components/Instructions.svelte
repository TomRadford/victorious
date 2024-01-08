<script lang="ts">
	import TimelineItem from '$lib/components/TimelineItem.svelte';
</script>

<div>
	<div class="mx-auto flex w-full flex-col justify-center overflow-y-hidden xl:w-3/5">
		<h1 class="my-4 text-left text-4xl font-bold leading-tight text-white opacity-75 md:text-5xl">
			How to order
		</h1>
	</div>
	<ul class="timeline timeline-vertical timeline-snap-icon mx-auto sm:px-32 lg:px-0">
		<TimelineItem prefix="Step 1" title="Design & Order">
			<a href="/products" class="font-bold">Design</a> your order, add it to your cart and fill out
			all the the info on this page. <br />
			We'll send you an invoice with all the details ✨
		</TimelineItem>
		<TimelineItem prefix="Step 2" title="Get impressions">
			Download the <a target="_blank" href="/ImpressionMoldingInstructions.pdf" class="font-bold"
				>ear impression guide</a
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
			<a class="font-bold" href="mailto:ben@victoriousaudio.co.za">ben@victoriousaudio.co.za</a>
			<p class=" text-sm font-extralight">Please allow up to 2 working days for a response.</p>
		</TimelineItem>
		<TimelineItem prefix="Step 4" title="Ship impressions">
			Once your impressions are verified, you will receive a packing slip as well as shipping
			details. It is critical that the slip is shipped with the impressions to make sure your
			impressions are processed correctly.
			<p class=" text-sm font-extralight">
				It is highly recommended that you use a shipping service that provides a tracking number
				(recommended services will be provided in the packing slip email). Victorious Audio does not
				take responsibility for lost or stolen shipments before a receipt has been confirmed by an
				official Victorious Audio representative.
			</p>
		</TimelineItem>
	</ul>
</div>
