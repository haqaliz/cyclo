<script lang="ts">
	import { storage } from '$lib';
	import { Button, Input } from '$components';
	import { support } from '$firebase';

	$: storageContactBaseUrl = `${storage.public.base_url}/${encodeURIComponent('public/img/contact/')}`;

	let form: any = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	const submit = async () => {
		if (!form.name || !form.email || !form.subject || !form.message) return;
		await support.contact(form);
		form.name = '';
		form.email = '';
		form.subject = '';
		form.message = '';
	};
</script>

<div class="flex flex-col">
	<div class="flex flex-col md:flex-row">
		<!-- Welcome section -->
		<div
			class="
                flex flex-col p-2 md:p-16 mb-2 md:mb-0 md:mr-8
                border-b-2 md:border-b-0 md:border-r-2 border-black
            "
		>
			<h1 class="font-semibold text-2xl md:text-6xl md:leading-snug md:max-w-3xl mb-2 md:mb-8">
				Contact Us
			</h1>
			<p class="text-base md:text-lg text-justify mb-2 md:mb-6">
				We value your feedback and inquiries. Whether you have questions, suggestions, or require
				assistance, we're here to help. Please use the form below to get in touch with us, and we'll
				respond as soon as possible.
			</p>
			<div class="flex flex-row items-center justify-center">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					class="h-[220px] md:h-[340px] drag-none"
					src={`${storageContactBaseUrl}support.webp?alt=media&token=704e4853-5248-4347-a3ee-6b69ba2c5691`}
				/>
			</div>
		</div>

		<!-- Info section -->
		<div class="flex flex-col p-2 md:p-4">
			<h3 class="font-semibold text-lg md:text-3xl md:mt-16 mb-2 md:mb-6">Contact Information</h3>
			<p
				class="flex flex-row items-center flex-wrap text-base md:text-lg text-justify mb-2 md:mb-6 md:min-w-max md:max-w-6xl"
			>
				Email:
				<Button type="text" href="mailto:info@cyclo.dev" class="ml-2">
					info@cyclo.dev
				</Button>
			</p>
			<div class="flex flex-row items-center justify-center">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					class="h-[180px] md:w-[320px] md:h-[240px] drag-none mx-16"
					src={`${storageContactBaseUrl}mail.webp?alt=media&token=5d808ef1-a35c-4d3e-93ca-5f65dcab0c02`}
				/>
			</div>
		</div>
	</div>

	<!-- Form section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Contact Form
		</h2>
		<div
			class="
			flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
			bg-opacity-25 hover:bg-black hover:bg-opacity-10
		"
		>
			<p class="text-justify mb-2 md:mb-4">Please fill out the form below to contact us:</p>
			<div class="flex flex-col md:flex-row mb-2 md:mb-4">
				<Input bind:value={form.name} placeholder="Name" class="mb-2 md:mb-0 md:mr-4" />
				<Input bind:value={form.email} placeholder="Email" />
			</div>
			<Input bind:value={form.subject} placeholder="Subject" class="mb-2 md:mb-4" />
			<Input bind:value={form.message} type="textarea" placeholder="Message" class="min-h-[140px] mb-2 md:mb-4" />
			<div class="flex flex-row">
				<Button on:click={submit}>Submit</Button>
			</div>
		</div>
	</div>

	<!-- Commitment section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Our Commitment
		</h2>
		<p class="text-base md:text-lg text-justify mb-2 md:mb-4">
			Cyclo is dedicated to providing a secure, respectful, and informative platform for all your
			menstrual health needs. Your feedback is invaluable in helping us improve and better serve
			your needs.
		</p>
	</div>

	<!-- Response section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Response Time
		</h2>
		<p class="text-base md:text-lg text-justify mb-2 md:mb-4">
			We aim to respond to inquiries within 48 hours. Please note that response times may vary based
			on the volume of inquiries.
		</p>
	</div>

	<!-- Support section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Customer Support
		</h2>
		<p class="flex flex-row items-center flex-wrap text-base md:text-lg text-justify mb-2 md:mb-4">
			For additional support or urgent matters, you can reach our customer support team at
			<Button type="text" href="mailto:info@cyclo.dev" class="mx-2">
				info@cyclo.dev
			</Button>.
		</p>
	</div>

	<!-- Final section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<p class="text-base md:text-lg text-justify mb-2 md:mb-4">
			Thank you for choosing Cyclo. We appreciate your support and look forward to assisting you.
		</p>
	</div>
</div>
