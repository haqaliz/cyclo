import { challenges as chlng } from '$api';
import { writable } from 'svelte/store';

const challenges = writable(null);

challenges.get = async () => {
	const r = await chlng.list();
	if (!r) return;
	challenges.set(r);
};

export default challenges;
