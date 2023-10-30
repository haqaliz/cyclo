<script lang="ts">
	import { misc } from '$api';
	import { DOMAIN } from '$config';
	const title = 'Contact Us | Cyclo';
	const description =
		"Contact Cyclo for inquiries, assistance, or feedback. We're here to support you on your menstrual health journey and value your input.";
	const keywords = [
		'Cyclo contact us',
		'Cyclo feedback',
		'Cyclo assistance',
		'Cyclo inquiries',
		'Cyclo customer support',
		'Cyclo menstrual health',
		'Cyclo user inquiries'
	];

	interface Form {
		name: string;
		email: string;
		subject: string;
		message: string;
	}

	let form: Form = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	const submit = async () => {
		if (!form.name || !form.email || !form.subject || !form.message) return;
		await misc.contact(form);
		form.name = '';
		form.email = '';
		form.subject = '';
		form.message = '';
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords.join(',')} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={DOMAIN} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={`${DOMAIN}img/contact/cover.webp`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={DOMAIN} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={`${DOMAIN}img/contact/cover.webp`} />

	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

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
				<div
					class="bg-contain bg-no-repeat bg-center w-full h-[220px] md:h-[340px]"
					style:background-image="url(/img/contact/support.webp)"
				/>
			</div>
		</div>

		<!-- Info section -->
		<div class="flex flex-col p-2 md:p-4">
			<h3 class="font-semibold text-lg md:text-3xl md:mt-16 mb-2 md:mb-6">Contact Information</h3>
			<p
				class="flex flex-row flex-wrap text-base md:text-lg text-justify mb-2 md:mb-6 md:min-w-max md:max-w-6xl"
			>
				Email:
				<a
					href="mailto:info@cyclo.dev"
					class="
						flex flex-row transition-all ease-in-out
						hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
					"
				>
					info@cyclo.dev
				</a>
			</p>
			<div class="flex flex-row items-center justify-center">
				<div
					class="bg-contain bg-no-repeat bg-center w-full h-[180px] md:w-[320px] md:h-[240px]"
					style:background-image="url(/img/contact/mail.webp)"
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
			flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
			bg-opacity-25 hover:bg-black hover:bg-opacity-10
		"
		>
			<p class="text-justify mb-2 md:mb-4">Please fill out the form below to contact us:</p>
			<div class="flex flex-col md:flex-row mb-2 md:mb-4">
				<input
					bind:value={form.name}
					type="text"
					placeholder="Name"
					class="flex-1 p-2 rounded font-sans font-medium text-lg border-2 resize-none mb-2 md:mb-0 md:mr-4"
				/>
				<input
					bind:value={form.email}
					type="email"
					placeholder="Email"
					class="flex-1 p-2 rounded font-sans font-medium text-lg border-2 resize-none"
				/>
			</div>
			<input
				bind:value={form.subject}
				type="text"
				placeholder="Subject"
				class="flex-1 p-2 rounded font-sans font-medium text-lg border-2 resize-none mb-2 md:mb-4"
			/>
			<textarea
				bind:value={form.message}
				placeholder="Message"
				class="flex-1 p-2 rounded font-sans font-medium text-lg border-2 resize-none min-h-[140px] mb-2 md:mb-4"
			/>
			<div class="flex flex-row">
				<button
					on:click={submit}
					class="py-2 px-8 flex-1 md:flex-none rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
				>
					Submit
				</button>
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
		<p class="flex flex-row flex-wrap text-base md:text-lg text-justify mb-2 md:mb-4">
			For additional support or urgent matters, you can reach our customer support team at
			<a
				href="mailto:info@cyclo.dev"
				class="
					flex flex-row transition-all ease-in-out
					hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
				"
			>
				info@cyclo.dev
			</a>.
		</p>
	</div>

	<!-- Final section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<p class="text-base md:text-lg text-justify mb-2 md:mb-4">
			Thank you for choosing Cyclo. We appreciate your support and look forward to assisting you.
		</p>
	</div>
</div>
