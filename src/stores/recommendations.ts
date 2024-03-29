/* eslint-disable @typescript-eslint/no-explicit-any */
import { recommendations as rec } from '$firebase';
import { writable } from 'svelte/store';

const recommendations = writable<any|null>(null);

recommendations.get = async (userId: string) => {
	const r = await rec.getRecommendationsForUser({
		user_id: userId,
	});
	recommendations.set(r);
};

export default recommendations;
