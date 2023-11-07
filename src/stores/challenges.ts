import { challenges as chlng } from '$api';
import { writable } from 'svelte/store';

const challenges: any = writable(null);

challenges.get = async () => {
	const r = await chlng.list();
	if (!r) return;
	challenges.byId = Object.fromEntries(
		Object.values(r ?? {})
			.reduce((a, i) => {
				a = [...a, ...i];
				return a;
			}, [])
			.map((i) => [i.id, i])
	);
	challenges.set(r);
};

challenges.withId = (id) => challenges?.byId?.[id] ?? {};

export default challenges;
