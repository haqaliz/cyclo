import { misc } from '$api';
import { writable } from 'svelte/store';

const brands = writable(null);

brands.get = async () => {
	const r = await misc.brands();
	if (!r) return;
	brands.set(r);
};

export default brands;
