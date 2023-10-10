<script lang="ts">
	import { user } from '$stores';
	const origin = {
		'development:local': 'https://cyclotic-fc537.web.app/',
		development: 'https://cyclotic-fc537.web.app/',
		staging: 'https://cyclotic-fc537.web.app/',
		production: 'https://cyclo.dev/'
	}[import.meta.env.MODE];
	const title = 'Cyclo | Your Menstrual Health Companion';
	const description =
		'Begin yo transformative menstrual health journey with Cyclo, Your trusted tracking and insight companion. Join us and embrace the power of informed choices!';
	const keywords = [
		'menstrual cycle tracker',
		"women's health, period tracking app",
		'fertility tracker',
		'PMS management',
		'reproductive health'
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
	<meta property="og:url" content={origin} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={`${origin}img/misc/cover.webp`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={origin} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={`${origin}img/misc/cover.webp`} />

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
				Your Ultimate Menstrual Health Companion
			</h1>
			<p class="text-base md:text-lg text-justify mb-2 md:mb-6">
				Are you ready to take control of your menstrual health like never before? Get started with
				Cyclo, your all-in-one menstrual cycle tracking and empowerment platform.
			</p>
			<div class="flex flex-row items-center justify-center">
				<div
					class="bg-contain bg-no-repeat bg-center w-full h-[180px] md:h-[240px]"
					style:background-image="url(/img/misc/analytics.webp)"
				/>
			</div>
		</div>

		<!-- Info section -->
		<div class="flex flex-col p-2 md:p-4">
			<h3 class="font-semibold text-lg md:text-3xl md:mt-16 mb-2 md:mb-6">
				Your personalized health dashboard
			</h3>
			<p class="text-base md:text-lg text-justify mb-2 md:mb-6">
				At Cyclo, we understand that your menstrual health is as unique as you are. That's why we're
				thrilled to introduce our innovative "Cycle Insights" feature.
			</p>
			<div class="flex flex-row items-center justify-center">
				<div
					class="bg-contain bg-no-repeat bg-center w-full h-[180px] md:h-[260px]"
					style:background-image="url(/img/misc/books.webp)"
				/>
			</div>
		</div>
	</div>

	<!-- Intro section -->
	<div class="flex flex-col md:flex-row p-2 md:py-4 md:px-16">
		<div
			class="hidden md:flex bg-contain bg-no-repeat bg-center w-full md:max-w-xl md:h-[250px]"
			style:background-image="url(/img/misc/applications.webp)"
		/>
		<div class="flex flex-col">
			<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
				What is Cyclo?
			</h2>
			<p class="text-base md:text-lg text-justify">
				Cyclo is more than just a period tracker; it's your partner in every phase of your cycle. We
				believe that understanding your body should be empowering, not confusing. With Cyclo, you'll
				gain deep insights into your menstrual health, equipping you to make informed decisions and
				live your life to the fullest.
			</p>
		</div>
	</div>

	<!-- Why section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Why Choose Cyclo?
		</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Comprehensive Tracking</h3>
				<p class="text-justify">
					Cyclo allows you to effortlessly track your menstrual cycle, fertility, and symptoms. Our
					intuitive interface makes it easy to log your data and monitor changes over time.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Educational Resources</h3>
				<p class="text-justify">
					Knowledge is power. Cyclo offers a wealth of educational resources, from in-depth
					tutorials to a comprehensive wiki library. Whether you're a beginner or an expert, you'll
					find valuable insights here.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Advanced Analytics</h3>
				<p class="text-justify">
					Unlock the secrets of your cycle with our advanced analytics tools. Dive deep into your
					data to discover patterns and make informed choices about your health.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Personalized Insights</h3>
				<p class="text-justify">
					Cyclo provides personalized insights and recommendations based on your unique cycle. Say
					goodbye to one-size-fits-all solutions; Cyclo is tailored to you.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Community Support</h3>
				<p class="text-justify">
					Connect with a supportive community of individuals on similar journeys. Share experiences,
					seek advice, and find solidarity in our welcoming community.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Privacy and Security</h3>
				<p class="text-justify">
					We understand the importance of your data's security and your privacy. Rest assured that
					your information is protected with state-of-the-art security measures.
				</p>
			</div>
		</div>
	</div>

	<!-- Join section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Join Our Menstrual Health Revolution
		</h2>
		<p class="text-base md:text-lg text-justify">
			Ready to embark on a journey of self-discovery and empowerment? Join Cyclo today and become
			part of our menstrual health revolution. Take control, gain insights, and live life on your
			terms.
		</p>
		<div class="flex flex-row items-center justify-center">
			<div
				class="bg-contain bg-no-repeat bg-center w-full h-[190px] md:h-[228px]"
				style:background-image="url(/img/misc/say-hello.webp)"
			/>
		</div>
	</div>

	<!-- Start section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Get Started Now
		</h2>
		<p class="text-base md:text-lg text-justify mb-2 md:mb-4">
			Sign up today to begin your Cyclo journey. It's time to take charge of your menstrual health
			and embrace a brighter, healthier tomorrow. Step into Cyclo's world, where knowledge is power,
			and empowerment is everything.
		</p>
		{#if !$user}
			<div class="flex flex-row items-center justify-center">
				<a
					href="/signup"
					class="
						p-2 rounded bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400
						font-sans font-medium text-lg focus:outline-none focus:ring-2
						focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center
						justify-center px-8 w-full md:w-auto
					"
				>
					Join Us Now
				</a>
			</div>
		{/if}
	</div>

	<!-- footer -->
	<div class="flex flex-col p-2 md:p-4">
		<div
			class="flex flex-col p-2 md:p-4 md:flex-row border-t-2 border-t-black mb-2 sm:mb-4 pt-2 sm:pt-4"
		>
			<div class="flex flex-col sm:max-w-sm mb-2 md:mb-0">
				<a href="/" class="flex flex-row items-center select-none mb-2 sm:mb-4">
					<div
						class="bg-cover bg-no-repeat bg-center w-[39px] h-[27px] mr-2"
						style:background-image="url(/img/misc/cyclo-logo.svg)"
					/>
					<h3 class="font-sans font-semibold text-2xl">Cyclo</h3>
				</a>
				<p class="tracking-wide text-gray-700">
					Empowering individuals on their menstrual health journey, Cyclo offers comprehensive
					tracking, insights, and a vibrant community for informed choices and wellness. Join us
					today!
				</p>
			</div>

			<div class="flex-1" />

			<!-- <div class="flex flex-row items-center">
				<div class="flex flex-col mr-8">
					<a href="/about" class="font-semibold mb-2 sm:mb-4">About Us</a>
					<a href="/contact" class="font-semibold">Contact Us</a>
				</div>
				<div class="flex flex-col">
					<a href="/terms-and-conditions" class="font-semibold mb-2 sm:mb-4">Terms and Conditions</a>
					<a href="/privacy-policy" class="font-semibold">Privacy Policy</a>
				</div>
			</div> -->
		</div>

		<div class="flex flex-row items-center">
			<span class="tracking-wide text-gray-700">© Cyclo 2023 | All Rights Reserved</span>
			<div class="flex-1" />
			<div class="flex flex-row items-center">
				<a href="https://www.linkedin.com/company/cyclotic/" class="mr-2 sm:mr-4">
					<i class="cy-linkedin-in text-2xl" />
				</a>
				<a href="https://twitter.com/cycloticx">
					<i class="cy-x-twitter text-2xl" />
				</a>
			</div>
		</div>
	</div>
</div>
