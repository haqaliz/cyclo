import { user } from '$api';
import { writable } from 'svelte/store';

const recommendations = writable(null);

recommendations.get = async () => {
	const r = await user.getRecommendations();
	if (!r) return;
	recommendations.set(r);
};

export default recommendations;
