<script lang="ts">
	import { user } from '$stores';
	import { DOMAIN } from '$config';
	const title = 'About | Cyclo';
	const description =
		"Discover Cyclo's mission, team, and commitment to menstrual health empowerment.";
	const keywords = [
		'Cyclo mission',
		'Cyclo team',
		'Cyclo menstrual health empowerment',
		'about Cyclo',
		'meet the Cyclo team',
		'Cyclo informed choices',
		'Cyclo menstrual health journey'
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
	<meta property="og:image" content={`${DOMAIN}img/about/cover.webp`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={DOMAIN} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={`${DOMAIN}img/about/cover.webp`} />

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
			<h3 class="font-semibold text-lg md:text-3xl md:mt-16 mb-2 md:mb-6">Our Story</h3>
			<p class="text-base md:text-lg text-justify mb-2 md:mb-6 md:max-w-xl">
				At Cyclo, we believe that every individual's menstrual health journey is unique and deserves
				utmost attention and care. Our story began with a simple idea: to create a platform that
				empowers people to take control of their reproductive health by providing accurate tracking,
				valuable insights, and a supportive community. We understand that menstrual health extends
				beyond periods and that informed choices can lead to a happier, healthier life.
			</p>
			<div class="flex flex-row items-center justify-center">
				<div
					class="bg-contain bg-no-repeat bg-center w-full h-[180px] md:h-[240px]"
					style:background-image="url(/img/about/typewriter.webp)"
				/>
			</div>
		</div>

		<!-- Info section -->
		<div class="flex flex-col p-2 md:p-4">
			<h1 class="font-semibold text-2xl md:text-6xl md:leading-snug md:max-w-3xl mb-2 md:mb-8">
				About Us
			</h1>
			<p class="text-base md:text-lg text-justify mb-2 md:mb-6">
				Experience Cyclo today! - Your Trusted Companion for Menstrual Health
			</p>
			<div class="flex flex-row items-center justify-center">
				<div
					class="bg-contain bg-no-repeat bg-center w-full h-[220px] md:h-[340px]"
					style:background-image="url(/img/about/assistant.webp)"
				/>
			</div>
		</div>
	</div>

	<!-- Intro section -->
	<div class="flex flex-col md:flex-row p-2 md:py-4 md:px-16">
		<div
			class="hidden md:flex bg-contain bg-no-repeat bg-center w-full md:max-w-xs md:h-[250px]"
			style:background-image="url(/img/about/knowledge.webp)"
		/>
		<div class="flex flex-col">
			<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
				Our Mission
			</h2>
			<p class="text-base md:text-lg text-justify">
				<strong>Empowering Knowledge:</strong> Our mission is simple - to empower individuals with knowledge.
				We believe that informed choices are the cornerstone of well-being. Cyclo is dedicated to providing
				comprehensive tracking, insightful information, and a welcoming community, all aimed at helping
				you make informed decisions about your menstrual health.
			</p>
		</div>
	</div>

	<!-- Exp section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			The Cyclo Experience
		</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-8">
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Comprehensive Tracking</h3>
				<p class="text-justify">
					Cyclo is more than just a period tracker; it's your personal menstrual health companion.
					We offer a user-friendly platform that allows you to accurately track your menstrual
					cycle. From the length of your periods to the intensity of PMS symptoms, Cyclo covers it
					all. With our intuitive calendar and reminders, you'll never miss a beat.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Valuable Insights</h3>
				<p class="text-justify">
					Understanding your body is essential to well-being. Cyclo provides you with valuable
					insights into your fertility, reproductive health, and more. Our in-depth articles and
					resources help you navigate the intricacies of your menstrual cycle, making your journey
					not just informed but also empowering.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Vibrant Community</h3>
				<p class="text-justify">
					Join our growing community of individuals who share your passion for menstrual health.
					Connect, share experiences, and support one another. Whether you have questions, need
					advice, or simply want to engage in meaningful discussions, Cyclo's community is here for
					you.
				</p>
			</div>
			<div
				class="
                flex flex-col p-2 md:p-4 rounded bg-white transition-all ease-in-out
                bg-opacity-25 hover:bg-black hover:bg-opacity-10
            "
			>
				<h3 class="font-semibold text-lg mb-2 md:mb-4">Holistic Well-being</h3>
				<p class="text-justify">
					Menstrual health is about more than just periods. It's about embracing your body's natural
					rhythms and optimizing your overall well-being. Cyclo offers resources on nutrition,
					exercise, mental health, and more, ensuring that your journey towards a healthier you is
					holistic.
				</p>
			</div>
		</div>
	</div>

	<!-- Team section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Meet the Team
		</h2>
		<p class="text-base md:text-lg text-justify mb-2 sm:mb-4">
			Behind Cyclo is a passionate team dedicated to revolutionizing menstrual health. Our experts
			in women's health, technology, and community building work tirelessly to provide you with the
			best possible experience. Meet the faces behind Cyclo:
		</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-8">
			<div class="flex flex-col">
				<strong class="flex flex-row flex-wrap mb-1 sm:mb-3">
					<a
						href="https://www.linkedin.com/in/alihaqiqi/"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						Ali Alizade Haqiqi:
					</a>
				</strong>
				<p>
					Our visionary founder, Ali Alizade Haqiqi, had a vision of empowering individuals through
					knowledge. Their expertise in web development and maching learning laid the foundation for
					Cyclo.
				</p>
			</div>
			<div class="flex flex-col">
				<strong class="flex flex-row flex-wrap mb-1 sm:mb-3">
					<a
						href="https://nyaspubs.onlinelibrary.wiley.com/doi/abs/10.1196/annals.1429.018"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						Dr. Shannon M. Hawkins,
					</a>
					<a
						href="https://nyaspubs.onlinelibrary.wiley.com/doi/abs/10.1196/annals.1429.018"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						Dr. Martin M. Matzuk,
					</a>
					<a
						href="https://www.sciencedirect.com/science/article/abs/pii/S0378432010004148"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						M. Mihm,
					</a>
					<a
						href="https://www.sciencedirect.com/science/article/abs/pii/S0378432010004148"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						S. Gangooly
					</a>
					<a
						href="https://www.sciencedirect.com/science/article/abs/pii/S0378432010004148"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						and S. Muttukrishna:
					</a>
				</strong>
				<p>
					our medical advisor resources, ensures that all our content and features are medically
					sound and reliable.
				</p>
			</div>
			<div class="flex flex-col">
				<strong class="flex flex-row flex-wrap mb-1 sm:mb-3">
					<a
						href="https://www.linkedin.com/in/alihaqiqi/"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						Ali Alizade Haqiqi:
					</a>
				</strong>
				<p>
					Ali Alizade haqiqi leads our tech team, ensuring that Cyclo is always user-friendly and
					up-to-date with the latest technology.
				</p>
			</div>
			<div class="flex flex-col">
				<strong class="flex flex-row flex-wrap mb-1 sm:mb-3">
					<a
						href="https://www.linkedin.com/in/alihaqiqi/"
						class="
							flex flex-row transition-all ease-in-out
							hover:bg-black hover:bg-opacity-10 px-2 rounded font-semibold
						"
					>
						Ali Alizade Haqiqi:
					</a>
				</strong>
				<p>
					Ali Alizade Haqiqi, our community manager, fosters a welcoming and supportive environment
					within Cyclo's community.
				</p>
			</div>
		</div>
	</div>

	<!-- Start section -->
	<div class="flex flex-col p-2 md:py-4 md:px-16">
		<h2 class="font-semibold text-2xl md:text-3xl md:leading-snug md:max-w-3xl mb-2 md:mb-4">
			Join Our Community
		</h2>
		<p class="text-base md:text-lg text-justify mb-2 md:mb-4">
			Your menstrual health journey matters, and we're here to support you every step of the way.
			Whether you're new to Cyclo or a longtime member, we invite you to explore the wealth of
			resources, connect with fellow enthusiasts, and embark on a journey of empowerment.
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
</div>
