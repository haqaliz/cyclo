<script lang="ts">
	import { Button } from '$components';
</script>

<div class="flex flex-col p-4">
	<div
		class="flex flex-col p-4 md:flex-row border-t-2 border-t-black mb-4 pt-4"
	>
		<div class="flex flex-col items-start max-w-sm">
			<Button type="text" href="/" class="group/logo mb-2">
                <svg
                    height="20"
                    viewBox="0 0 39 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.0051 0.100752C18.7683 0.0936285 18.5326 0.137615 18.3142 0.229889C18.0958 0.322162 17.8998 0.46056 17.7398 0.635739C16.2213 2.29857 15.0249 4.01029 14.1946 5.76668C12.487 4.5788 10.4461 3.63136 8.10957 2.89404C7.89167 2.82531 7.66181 2.80265 7.43484 2.82743C7.20777 2.85221 6.98827 2.92393 6.79037 3.03812C6.59246 3.15231 6.42036 3.30654 6.28528 3.49119C6.15021 3.67582 6.0552 3.8867 6.00652 4.11039C5.3713 7.03043 5.2666 9.73888 5.78906 12.1846C4.38776 12.2385 2.91987 12.438 1.39192 12.7727C1.16908 12.8215 0.958487 12.9161 0.773881 13.0508C0.589331 13.1854 0.434783 13.3571 0.320291 13.555C0.205771 13.7529 0.1339 13.9726 0.109413 14.2001C0.0849222 14.4276 0.108387 14.6576 0.178241 14.8754C1.60381 19.3179 3.91056 22.6774 7.24652 24.5677C10.4939 26.4077 14.5018 26.7306 19.1001 25.7076C23.6983 26.7305 27.7061 26.4077 30.9535 24.5677C34.2895 22.6774 36.5962 19.318 38.0217 14.8755C38.0916 14.6577 38.1151 14.4276 38.0906 14.2001C38.0661 13.9726 37.9942 13.7529 37.8797 13.555C37.7652 13.3571 37.6107 13.1854 37.4261 13.0508C37.2415 12.9161 37.031 12.8215 36.8082 12.7727C35.2161 12.424 33.6893 12.2224 32.235 12.1791C32.7561 9.73482 32.651 7.02826 32.0162 4.11045C31.9675 3.88676 31.8725 3.67581 31.7374 3.49119C31.6023 3.30654 31.4302 3.15231 31.2323 3.03812C31.0344 2.92393 30.8149 2.85221 30.5879 2.82743C30.3609 2.80265 30.1311 2.82528 29.9132 2.89401C27.5699 3.63348 25.5238 4.58423 23.8132 5.77698C22.9392 4.02775 21.7103 2.31232 20.1682 0.632484C20.0195 0.470591 19.8399 0.340189 19.6402 0.248951C19.4404 0.157691 19.2244 0.107359 19.0051 0.100752ZM29.3292 21.7142C27.262 22.8855 24.6313 23.3079 21.2696 22.782C22.4638 19.7732 24.1318 17.8283 26.2029 16.699C27.7362 15.8629 29.5779 15.4317 31.7708 15.4496C32.5499 15.4559 33.3734 15.5195 34.2419 15.6417C33.0166 18.5854 31.3668 20.5597 29.3292 21.7142ZM8.87091 21.7142C6.83338 20.5597 5.1834 18.5854 3.95807 15.6418C4.82657 15.5196 5.64989 15.456 6.42894 15.4496C8.62142 15.4316 10.4625 15.8629 11.9955 16.699C14.0661 17.8282 15.7341 19.7731 16.9297 22.7821C13.5684 23.3079 10.938 22.8855 8.87091 21.7142ZM19.2344 19.0338C21.2576 16.497 22.1162 14.0854 22.0632 11.7362C22.0102 9.38353 21.0276 6.90646 18.9629 4.28115C17.0114 6.81239 16.1185 9.22321 16.1331 11.5564C16.1479 13.9219 17.0952 16.3992 19.2344 19.0338ZM7.92877 9.16918C7.91221 8.2816 7.97273 7.34495 8.11118 6.35829C8.13962 6.15564 8.17134 5.95088 8.20636 5.744C8.00085 6.95811 7.90881 8.0993 7.92877 9.16918ZM9.23181 12.372C8.73422 10.7509 8.60847 8.85607 8.89631 6.6571C10.5852 7.33551 11.9784 8.13647 13.0911 9.04429C12.9223 9.88208 12.8387 10.7267 12.844 11.5768C12.8481 12.2309 12.9049 12.883 13.0134 13.5323C11.8399 12.9674 10.5758 12.5846 9.23181 12.372ZM25.0004 8.98825C26.1015 8.10344 27.4722 7.32152 29.1264 6.65709C29.416 8.86982 29.2869 10.7746 28.7815 12.4024C27.5322 12.6159 26.3533 12.9785 25.2534 13.4998C25.3324 12.8899 25.3654 12.2772 25.3516 11.6623C25.3314 10.7653 25.2127 9.87353 25.0004 8.98825Z"
                        class="transition-all ease-in-out duration-300 fill-zinc-950 group-hover/logo:fill-zinc-50"
                    />
                </svg>
                Cyclo
            </Button>
			<p class="tracking-wide text-gray-700">
				Empowering individuals on their menstrual health journey, Cyclo offers comprehensive
				tracking, insights, and a vibrant community for informed choices and wellness. Join us
				today!
			</p>
		</div>

		<div class="flex-1" />

		<div class="flex flex-row items-start">
			<div class="flex flex-col items-start mr-8">
				<Button type="text" data-sveltekit-preload-data="hover" href="/about" class="mb-2">
					About Us
                </Button>
				<Button type="text" data-sveltekit-preload-data="hover" href="/contact">
					Contact Us
                </Button>
			</div>
			<div class="flex-1" />
			<div class="flex flex-col items-start">
                <Button type="text" data-sveltekit-preload-data="hover" href="/terms-and-conditions" class="mb-2">
					Terms and Conditions
                </Button>
				<Button type="text" data-sveltekit-preload-data="hover" href="/privacy-policy">
					Privacy Policy
                </Button>
			</div>
		</div>
	</div>

	<div class="flex flex-row items-center">
		<span class="tracking-wide text-gray-700">© Cyclo 2023 | All Rights Reserved</span>
		<div class="flex-1" />

		<div class="flex flex-row items-center">
            <Button type="text" href="https://www.instagram.com/cycloticx/" class="group/instagram w-12 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-full">
					<path
						d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                        class="transition-all ease-in-out duration-300 group-hover/instagram:fill-zinc-50"
					/>
				</svg>
            </Button>
			<Button type="text" href="https://www.facebook.com/profile.php?id=61552172254478" class="group/facebook w-12 mr-2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-full">
					<path
						d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        class="transition-all ease-in-out duration-300 group-hover/facebook:fill-zinc-50"
					/>
				</svg>
			</Button>
			<Button type="text" href="https://www.linkedin.com/company/cyclotic/" class="group/linkedin w-12 mr-2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-full">
					<path
						d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                        class="transition-all ease-in-out duration-300 group-hover/linkedin:fill-zinc-50"
					/>
				</svg>
			</Button>
			<Button type="text" href="https://twitter.com/cycloticx" class="group/twitter w-12">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-full">
					<path
						d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                        class="transition-all ease-in-out duration-300 group-hover/twitter:fill-zinc-50"
					/>
				</svg>
			</Button>
		</div>
	</div>
</div>
