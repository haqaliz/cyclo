<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	import { plans, selectedProduct } from '$stores';
	import { mask } from '$directives';
	import { user as usr } from '$api';

	const dispatch = createEventDispatcher();
	const tax = 13;

	let cardNumber = '';
	let expiryDate = '';
	let cvc = '';
	let card = {
		number: '',
		expiry_date: '',
		cvc: ''
	};
	let price = 0;
	let selectedProductObj;
	selectedProduct.subscribe((v) => {
		if (!v) return;
		const [plan, type] = v.split('_');
		selectedProductObj = $plans[type]?.find((i) => i.name === plan);
		price = parseFloat(selectedProductObj?.price, 10);
	});
	let cardNumberError = '';
	let expiryDateError = '';
	let cvcError = '';
	let generalError = '';
	$: priceTax = (price ?? 0) * (tax / 100);
	let isCheckoutDisabled = false;
	const backToPlans = () => {
		selectedProduct.set(null);
	};
	const checkout = async () => {
		cardNumberError = '';
		expiryDateError = '';
		cvcError = '';
		generalError = '';
		if (!card.number) {
			cardNumberError = 'Card number must contain 12 digits at least.';
			return;
		}
		if (!card.expiry_date) {
			expiryDateError = 'Expiry Date can not be empty.';
			return;
		}
		const expiryMonth = parseInt(card.expiry_date.substr(0, 2), 10);
		const expiryYear = parseInt(card.expiry_date.substr(2, 2), 10);
		const currentYear = parseInt(new Date().getFullYear().toString().substr(2, 2), 10);
		if (expiryMonth < 0 || expiryMonth > 12) {
			expiryDateError = 'Expiry month is not valid';
			return;
		}
		if (expiryYear < currentYear) {
			expiryDateError = 'Expiry year is not valid';
			return;
		}
		if (!card.cvc) {
			cvcError = 'CVC can not be empty.';
			return;
		}
		if (card.cvc.length < 3) {
			cvcError = 'CVC must be 3 digits at least.';
			return;
		}
		// Send to backend
		const r = await usr.subscribeForPlan({
			card: {
				number: card.number,
				exp_month: expiryMonth,
				exp_year: expiryYear,
				cvc: card.cvc
			},
			product_id: selectedProductObj?.product_id,
			price_id: selectedProductObj?.price_id
		});
		if (!r) {
			generalError = "Payment wasn't successful.";
			return;
		}
		dispatch('completed');
	};
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col w-full max-w-[750px]">
		<div class="flex flex-col sm:flex-row items-center justify-center mb-2 sm:mb-4">
			<div
				class="bg-cover bg-no-repeat bg-center w-[256px] h-[203px]"
				style:background-image="url(/img/misc/card.webp)"
			/>
			<div class="flex flex-row bg-gray-200 p-2 rounded select-none mt-2 sm:-mt-0 sm:ml-4">
				<span>Powered by</span>
				<div
					class="bg-cover bg-no-repeat bg-center w-[60px] h-[25px] ml-2"
					style:background-image="url(/img/misc/brands/stripe.svg)"
				/>
			</div>
		</div>
		<!-- Card Detail -->
		<div class="flex flex-col mb-2 sm:mb-4">
			<input
				bind:value={cardNumber}
				type="text"
				class="p-2 rounded font-sans font-medium text-lg border-2 resize-none w-full max-h-[48px]"
				placeholder="Card Number"
				use:mask={'0000 - 0000 - 0000[ - 0000]'}
				on:complete={({ detail }) => (card.number = detail.unmaskedValue)}
			/>
			{#if cardNumberError.length}
				<span in:slide out:slide class="text-red-500 font-medium mt-1">{cardNumberError}</span>
			{/if}
		</div>
		<div class="flex flex-col flex-1 sm:flex-row mb-2 sm:mb-4 w-full">
			<div class="flex flex-col flex-1 mb-2 sm:mb-0 sm:mr-4">
				<input
					bind:value={expiryDate}
					type="text"
					placeholder="Expiry Date"
					use:mask={'00 / 00'}
					class="p-2 rounded font-sans font-medium text-lg border-2 resize-none max-h-[48px]"
					on:complete={({ detail }) => (card.expiry_date = detail.unmaskedValue)}
				/>
				{#if expiryDateError.length}
					<span in:slide out:slide class="text-red-500 font-medium mt-1">{expiryDateError}</span>
				{/if}
			</div>
			<div class="flex flex-col flex-1 mb-2 sm:mb-0">
				<input
					bind:value={cvc}
					type="text"
					placeholder="CVC"
					class="p-2 rounded font-sans font-medium text-lg border-2 resize-none flex-1 max-h-[48px]"
					use:mask={'000[0]'}
					on:complete={({ detail }) => (card.cvc = detail.unmaskedValue)}
				/>
				{#if cvcError.length}
					<span in:slide out:slide class="text-red-500 font-medium mt-1">{cvcError}</span>
				{/if}
			</div>
		</div>

		<!-- Payment Detail -->
		<div class="flex flex-col mb-2 sm:mb-4">
			<div class="flex flex-row mb-2 sm:mb-4">
				<span class="flex-1 text-gray-400 font-semibold">Subtotal Due</span>
				<strong>${price}</strong>
			</div>
			<div class="flex flex-row mb-2 sm:mb-4">
				<span class="flex-1 text-gray-400 font-semibold">Tax</span>
				<strong>${priceTax}</strong>
			</div>
			<hr class="border-b-[1.5px] border-gray-200 mb-2 sm:mb-4" />
			<div class="flex flex-row">
				<span class="flex-1 text-gray-400 font-semibold">Total Payment Due</span>
				<strong>${(price + priceTax).toFixed(2)}</strong>
			</div>
		</div>

		<!-- Buttons Container -->
		<div class="flex flex-col sm:flex-row w-full sm:w-auto">
			<button
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center flex-1 sm:w-auto mb-2 sm:mb-0 sm:mr-4 px-8"
				on:click={backToPlans}
			>
				Back To Plans
			</button>
			<button
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center flex-1 sm:w-auto px-8"
				disabled={isCheckoutDisabled}
				on:click={checkout}
			>
				Checkout
			</button>
		</div>
		{#if generalError.length}
			<div
				in:slide
				out:slide
				class="p-2 rounded font-sans font-medium text-lg flex items-center error mt-2 sm:mt-4"
			>
				<i class="material-icons mr-2">warning</i>
				{generalError}
			</div>
		{/if}
	</div>
</div>
