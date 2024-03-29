<script lang="ts">
	import { user } from '$stores';
    import { storage } from '$lib';
	import { Button } from '$components';
    $: storageHomeBaseUrl = `${storage.public.base_url}/${encodeURIComponent('public/img/home/')}`;
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
				Your Ultimate Menstrual Health Companion
			</h1>
			<p class="text-base md:text-lg text-justify mb-2 md:mb-6">
				Are you ready to take control of your menstrual health like never before? Get started with
				Cyclo, your all-in-one menstrual cycle tracking and empowerment platform.
			</p>
			<div class="flex flex-row items-center justify-center">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					class="h-[180px] md:h-[240px] drag-none"
					src={`${storageHomeBaseUrl}analytics.webp?alt=media&token=037bcabc-0853-4312-96e7-f4a0dc12a6c8`}
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
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					class="h-[180px] md:h-[260px] drag-none"
					src={`${storageHomeBaseUrl}books.webp?alt=media&token=af2be39a-b857-4448-996a-ad9b715f6852`}
				/>
			</div>
		</div>
	</div>

	<!-- Intro section -->
	<div class="flex flex-col md:flex-row p-2 md:py-4 md:px-16">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img
			class="hidden md:flex md:max-w-xs md:h-[250px] drag-none"
			src={`${storageHomeBaseUrl}applications.webp?alt=media&token=aad90601-b79a-4fb7-9b8a-57d4d7d04f7d`}
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
                flex flex-col p-2 md:p-4 rounded-lg bg-white transition-all ease-in-out
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
			<!-- svelte-ignore a11y-missing-attribute -->
			<img
				class="h-[190px] md:h-[228px] drag-none"
                src={`${storageHomeBaseUrl}say-hello.webp?alt=media&token=4629bc3a-dad3-4529-98e3-a0af8ebdda7d`}
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
				<Button href="/login">
					Join Us Now
                </Button>
			</div>
		{/if}
	</div>
</div>
