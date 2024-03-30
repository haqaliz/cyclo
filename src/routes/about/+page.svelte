<script lang="ts">
	import { Button } from '$components';
	import { user } from '$stores';
	import { storage } from '$lib';

	const storageAboutBaseUrl = `${storage.public.base_url}/${encodeURIComponent('public/img/about/')}`;
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
			<h3 class="font-semibold text-lg md:text-3xl md:mt-16 mb-2 md:mb-6">Our Story</h3>
			<p class="text-base md:text-lg text-justify mb-2 md:mb-6 md:max-w-xl">
				At Cyclo, we believe that every individual's menstrual health journey is unique and deserves
				utmost attention and care. Our story began with a simple idea: to create a platform that
				empowers people to take control of their reproductive health by providing accurate tracking,
				valuable insights, and a supportive community. We understand that menstrual health extends
				beyond periods and that informed choices can lead to a happier, healthier life.
			</p>
			<div class="flex flex-row items-center justify-center">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					class="h-[180px] md:h-[240px] drag-none"
					src={`${storageAboutBaseUrl}typewriter.webp?alt=media&token=5769760c-2b79-439b-82bd-173771801d92`}
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
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					class="h-[220px] md:h-[340px] drag-none"
					src={`${storageAboutBaseUrl}assistant.webp?alt=media&token=080be469-024b-4786-a086-6ab86392f4d6`}
				/>
			</div>
		</div>
	</div>

	<!-- Intro section -->
	<div class="flex flex-col md:flex-row p-2 md:py-4 md:px-16">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img
			class="hidden md:flex md:max-w-xs md:h-[250px] drag-none"
			src={`${storageAboutBaseUrl}knowledge.webp?alt=media&token=8f32cd84-4be2-4e6e-a19a-22f262f79a16`}
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
					<Button type="text" size="small" href="https://www.linkedin.com/in/alihaqiqi/">
						Ali Alizade Haqiqi:
					</Button>
				</strong>
				<p>
					Our visionary founder, Ali Alizade Haqiqi, had a vision of empowering individuals through
					knowledge. Their expertise in web development and maching learning laid the foundation for
					Cyclo.
				</p>
			</div>
			<div class="flex flex-col">
				<strong class="flex flex-row flex-wrap mb-1 sm:mb-3">
					<Button type="text" size="small" href="https://nyaspubs.onlinelibrary.wiley.com/doi/abs/10.1196/annals.1429.018">
						Dr. Shannon M. Hawkins,
					</Button>
					<Button type="text" size="small" href="https://nyaspubs.onlinelibrary.wiley.com/doi/abs/10.1196/annals.1429.018">
						Dr. Martin M. Matzuk,
					</Button>
					<Button type="text" size="small" href="https://www.sciencedirect.com/science/article/abs/pii/S0378432010004148">
						M. Mihm,
					</Button>
					<Button type="text" size="small" href="https://www.sciencedirect.com/science/article/abs/pii/S0378432010004148">
						S. Gangooly
					</Button>
					<Button type="text" size="small" href="https://www.sciencedirect.com/science/article/abs/pii/S0378432010004148">
						and S. Muttukrishna:
					</Button>
				</strong>
				<p>
					our medical advisor resources, ensures that all our content and features are medically
					sound and reliable.
				</p>
			</div>
			<div class="flex flex-col">
				<strong class="flex flex-row flex-wrap mb-1 sm:mb-3">
					<Button type="text" size="small" href="https://www.linkedin.com/in/alihaqiqi/">
						Ali Alizade Haqiqi:
					</Button>
				</strong>
				<p>
					Ali Alizade haqiqi leads our tech team, ensuring that Cyclo is always user-friendly and
					up-to-date with the latest technology.
				</p>
			</div>
			<div class="flex flex-col">
				<strong class="flex flex-row flex-wrap mb-1 sm:mb-3">
					<Button type="text" size="small" href="https://www.linkedin.com/in/alihaqiqi/">
						Ali Alizade Haqiqi:
					</Button>
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
				<Button href="/login">
					Join Us Now
                </Button>
			</div>
		{/if}
	</div>
</div>
