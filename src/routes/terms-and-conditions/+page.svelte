<script lang="ts">
	import { DOMAIN } from '$config';
	const title = 'Terms & Conditions | Cyclo';
	const description =
		'Read the Terms & Conditions of Cyclo, your trusted companion for menstrual health. Learn about our rules, rights, and responsibilities.';
	const keywords = [
		'Cyclo terms and conditions',
		'Cyclo rules',
		'Cyclo user agreement',
		'Cyclo privacy',
		'Cyclo content ownership',
		'Cyclo liability',
		'Cyclo governing law',
		'Cyclo user content',
		'Cyclo restrictions',
		'Cyclo termination',
		'Cyclo copyright'
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
	<meta property="og:image" content={`${DOMAIN}img/terms-and-conditions/cover.webp`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={DOMAIN} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={`${DOMAIN}img/terms-and-conditions/cover.webp`} />

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
			Welcome to Cyclo's Terms and Conditions. This document outlines the rules, responsibilities,
			and rights for all users of the Cyclo website and services. By using our platform, you are
			agreeing to abide by these terms. We encourage you to read this document carefully. If you
			disagree with any part of these terms, please refrain from using Cyclo.
		</p>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">User Agreement</h3>
		<ol class="font-sans text-lg list-decimal list-inside mt-2 sm:mt-4">
			<li>
				<strong>Acceptance of Terms:</strong>
				<span
					>Upon accessing or using Cyclo, you acknowledge and accept these terms and agree to comply
					with all applicable laws and regulations. These terms constitute a legally binding
					agreement between you and Cyclo.</span
				>
			</li>
			<li>
				<strong>Privacy:</strong>
				<span
					>We take your privacy seriously. To understand how we collect, use, and protect your
					personal information, please consult our Privacy Policy.</span
				>
			</li>
			<li>
				<strong>Registration:</strong>
				<span
					>To use certain features of Cyclo, you may be required to create an account. You are
					responsible for maintaining the confidentiality of your account information and ensuring
					its accuracy. If you are under the age of 18, you must have parental or legal guardian
					consent to use Cyclo.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Use of Services</h3>
		<ol class="font-sans text-lg list-decimal list-inside">
			<li class="mt-2 sm:mt-4">
				<strong>License</strong>
				<span
					>Cyclo grants you a limited, non-exclusive, and non-transferable license to use our
					services. This license does not include the right to:</span
				>

				<ul class="font-sans text-lg list-disc list-inside">
					<li>Reproduce, modify, distribute, or publicly display any part of Cyclo.</li>
					<li>
						Use any automated system, including bots and crawlers, to access or interact with Cyclo.
					</li>
				</ul>
			</li>

			<li class="mt-2 sm:mt-4">
				<strong>Restrictions</strong>
				<span>While using Cyclo, you agree not to:</span>

				<ul class="font-sans text-lg list-disc list-inside">
					<li>
						Violate any applicable laws, including copyright, trademark, and other intellectual
						property laws.
					</li>
					<li>
						Engage in any activity that may disrupt or interfere with the functionality of Cyclo.
					</li>
					<li>
						Misuse, abuse, or attempt to gain unauthorized access to Cyclo or its users' accounts.
					</li>
				</ul>
			</li>

			<li class="mt-2 sm:mt-4">
				<strong>User Content</strong>
				<div class="flex flex-col">
					<span
						>Cyclo allows you to contribute content to our platform, such as comments, articles, and
						posts. You are solely responsible for the content you submit, and you must ensure that
						it complies with our guidelines.</span
					>
					<span
						>By contributing content to Cyclo, you grant us a worldwide, non-exclusive, royalty-free
						license to use, store, and display your content as necessary for the operation of our
						platform.</span
					>
				</div>
			</li>

			<li class="mt-2 sm:mt-4">
				<strong>Termination</strong>
				<span
					>Cyclo reserves the right to suspend or terminate your account and access to our services
					if you violate these terms or engage in any conduct that we deem to be harmful to our
					platform or our users.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Content Ownership</h3>
		<ol class="font-sans text-lg list-decimal list-inside">
			<li>
				<strong>Copyright</strong>
				<span
					>Cyclo and its content, including but not limited to text, graphics, logos, images, and
					software, are protected by copyright and other intellectual property laws. You may not
					use, reproduce, or distribute any part of Cyclo without our express permission.</span
				>
			</li>
			<li>
				<strong>User Contributions</strong>
				<span
					>While you retain ownership of the content you contribute to Cyclo, you grant us a
					perpetual, worldwide, non-exclusive, royalty-free, sublicensable, and transferable license
					to use, store, and display your content on and through Cyclo. This license is for the sole
					purpose of operating, promoting, and improving our services.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Disclaimers</h3>
		<ol class="font-sans text-lg list-decimal list-inside">
			<li>
				<strong>Accuracy</strong>
				<span
					>Cyclo strives to provide accurate and up-to-date information related to menstrual health.
					However, we do not guarantee the accuracy, completeness, or suitability of the information
					provided on our platform for any particular purpose. You should not rely solely on the
					information on Cyclo for making important decisions related to your health.</span
				>
			</li>
			<li>
				<strong>Liability</strong>
				<span
					>To the fullest extent permitted by applicable law, Cyclo and its officers, directors,
					employees, and agents will not be liable for any indirect, incidental, special,
					consequential, or punitive damages, or any loss of profits or revenues, whether incurred
					directly or indirectly, or any loss of data, use, goodwill, or other intangible losses,
					resulting from your use of Cyclo.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Governing Law</h3>
		<ol class="font-sans text-lg list-decimal list-inside">
			<li>
				<strong>Jurisdiction</strong>
				<span
					>These terms are governed by the laws of Canada. Any disputes arising from or in
					connection with these terms will be subject to the exclusive jurisdiction of the courts in
					Canada.</span
				>
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out mt-2 sm:mt-4
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col"
	>
		<h3 class="font-sans font-semibold text-3xl">Miscellaneous</h3>
		<ol class="font-sans text-lg list-decimal list-inside">
			<li>
				<strong>Changes</strong>
				<span
					>Cyclo may modify these terms at any time. When we do, we will provide notice of the
					change on our platform, and the revised terms will be effective at that time.</span
				>
			</li>
			<li>
				<strong>Entire Agreement</strong>
				<span
					>These terms constitute the entire agreement between you and Cyclo regarding your use of
					our platform and supersede any prior agreements.</span
				>
			</li>
			<li>
				<strong>Contact</strong>
				<p class="flex flex-row flex-wrap">
					If you have any questions or concerns about these terms, please feel free to contact us at
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
			</li>
		</ol>
	</div>
	<div
		class="bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 flex flex-col mt-2 sm:mt-4"
	>
		<h3 class="font-sans font-semibold text-3xl">Conclusion</h3>
		<p class="font-sans text-lg text-justify mt-2 sm:mt-4">
			Thank you for using Cyclo. We're committed to providing you with a safe and informative
			platform for menstrual health. If you have any questions or concerns about these terms or any
			other aspect of our services, please don't hesitate to reach out to us. Your trust and safety
			are our top priorities.
		</p>
	</div>
</div>
