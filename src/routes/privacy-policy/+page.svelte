<script lang="ts">
	import { DOMAIN } from '$config';
	const title = 'Privacy Policy | Cyclo';
	const description =
		'Learn how Cyclo respects your privacy and handles your data. Our Privacy Policy provides insights into data collection, usage, and protection.';
	const keywords = [
		'Cyclo privacy policy',
		'Cyclo data protection',
		'Cyclo data usage',
		'Cyclo user privacy',
		'Cyclo data collection',
		'Cyclo terms and conditions'
	];
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
	<meta property="og:image" content={`${DOMAIN}img/privacy-policy/cover.webp`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={DOMAIN} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={`${DOMAIN}img/privacy-policy/cover.webp`} />

	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

<div class="p-2 sm:p-4 flex flex-col">
	<div
		class="bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Introduction</h3>
		<p class="font-sans text-lg text-justify mt-2 sm:mt-4">
			Welcome to Cyclo's Privacy Policy. This document outlines our commitment to your privacy and
			explains how we collect, use, share, and protect your personal information. We value your
			trust and aim to be transparent about our practices. By using Cyclo, you agree to the terms
			and conditions of this policy. If you disagree with any part of this policy, please do not use
			our platform.
		</p>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Information We Collect</h3>
		<ol class="font-sans text-lg list-decimal list-inside mt-2 sm:mt-4">
			<li>
				<strong>User Account Information:</strong>
				<span
					>When you create a Cyclo account, we may collect personal information such as your name,
					email address, and date of birth. You may also provide additional information to
					personalize your experience.</span
				>
			</li>
			<li>
				<strong>Tracking Data</strong>
				<span
					>Cyclo tracks your menstrual cycle data, including period start and end dates, symptoms,
					and other related information. This data helps us provide insights and predictions.</span
				>
			</li>
			<li>
				<strong>Device Information</strong>
				<span
					>We may collect information about the device you use to access Cyclo, including your
					device's unique identifiers and IP address.</span
				>
			</li>
			<li>
				<strong>Usage Information</strong>
				<span
					>Cyclo collects data about how you interact with our platform, including the pages you
					visit and the features you use. This information helps us improve our services.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">How We Use Your Information</h3>
		<ol class="font-sans text-lg list-decimal list-inside mt-2 sm:mt-4">
			<li>
				<strong>Personalization</strong>
				<span
					>We use your data to personalize your Cyclo experience, including providing you with
					relevant content and predictions related to your menstrual health.</span
				>
			</li>
			<li>
				<strong>Communication</strong>
				<span
					>We may use your email address to send you updates, newsletters, and important information
					about your Cyclo account.</span
				>
			</li>
			<li>
				<strong>Research and Analytics</strong>
				<span
					>Cyclo may use aggregated, non-identifiable data for research and analytics to improve our
					platform and better understand menstrual health trends.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col mt-2 sm:mt-4"
	>
		<h3 class="font-sans font-semibold text-3xl">Legal Requirements</h3>
		<p class="font-sans text-lg text-justify mt-2 sm:mt-4">
			We may access, use, and disclose your information to comply with legal obligations, respond to
			requests from authorities, and protect our rights and users.
		</p>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Information Sharing</h3>
		<ol class="font-sans text-lg list-decimal list-inside mt-2 sm:mt-4">
			<li>
				<strong>Service Providers</strong>
				<span
					>Cyclo may share your information with trusted service providers who help us operate,
					improve, and maintain our services.</span
				>
			</li>
			<li>
				<strong>Aggregated Data</strong>
				<span
					>We may share aggregated, non-personal information with third parties for research,
					analysis, or marketing purposes.</span
				>
			</li>
			<li>
				<strong>Legal Obligations</strong>
				<span
					>We may disclose your information to comply with legal obligations, respond to requests
					from authorities, or protect our rights and users.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Security</h3>
		<ol class="font-sans text-lg list-decimal list-inside mt-2 sm:mt-4">
			<li>
				<strong>Data Security</strong>
				<span
					>Cyclo implements industry-standard security measures to protect your information.
					However, no method of transmission over the internet is completely secure.</span
				>
			</li>
			<li>
				<strong>Account Security</strong>
				<span
					>You are responsible for maintaining the security of your account and password. If you
					believe your account has been compromised, please contact us immediately.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Cookies and Tracking Technologies</h3>
		<ol class="font-sans text-lg list-decimal list-inside mt-2 sm:mt-4">
			<li>
				<strong>Cookies</strong>
				<span
					>Cyclo uses cookies and similar tracking technologies to improve your experience on our
					platform and for analytical purposes.</span
				>
			</li>
			<li>
				<strong>Opting Out</strong>
				<span
					>You can adjust your browser settings to refuse or delete cookies. However, this may
					affect certain features of our platform.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Third-Party Links</h3>
		<ul class="font-sans text-lg list-disc list-inside mt-2 sm:mt-4">
			<li>
				<strong>External Links</strong>
				<span
					>Cyclo may contain links to external websites or services. We are not responsible for the
					privacy practices of these third-party sites.</span
				>
			</li>
		</ul>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Children's Privacy</h3>
		<ul class="font-sans text-lg list-disc list-inside mt-2 sm:mt-4">
			<li>
				<strong>Minors</strong>
				<span
					>Cyclo is intended for users over the age of 13. If we learn that we have collected
					information from a child under 13, we will take appropriate steps to delete that
					information.</span
				>
			</li>
		</ul>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Changes to this Policy</h3>
		<ol class="font-sans text-lg list-decimal list-inside mt-2 sm:mt-4">
			<li>
				<strong>Updates</strong>
				<span
					>Cyclo may update this policy from time to time. We will notify you of significant changes
					via email or by posting a notice on our platform.</span
				>
			</li>
			<li>
				<strong>Acceptance</strong>
				<span
					>By using Cyclo, you agree to the most recent version of this policy. It is your
					responsibility to review this policy regularly.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col mt-2 sm:mt-4"
	>
		<h3 class="font-sans font-semibold text-3xl">Contact Us</h3>
		<p class="font-sans text-lg text-justify flex flex-row flex-wrap mt-2 sm:mt-4">
			If you have any questions or concerns about this policy, please
			<a
				href="/contact"
				class="
					flex flex-row transition-all ease-in-out
					hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
				"
			>
				contact us
			</a>.
		</p>
	</div>
</div>
