import { browser } from '$app/environment';
import { user as usr } from '$api';
import { writable } from 'svelte/store';
import token from './token';
import plans from './plans';
import challenges from './challenges';
import recommendations from './recommendations';
import brands from './brands';

const user = writable((browser && JSON.parse(localStorage.getItem('user'))) || null);

user.getRelatedData = async () => {
	await Promise.all([challenges.get(), recommendations.get(), plans.get(), brands.get()]);
};

user.get = async (deep = true) => {
	if (localStorage.getItem('token')) token.set(localStorage.getItem('token'));
	const r = await usr.getInfo();
	if (!r) {
		token.set(null);
		user.set(null);
		return;
	}
	if (!r.subscription)
		r.subscription = {
			updated_at: {
				seconds: 1694285050,
				nanoseconds: 397000000
			},
			user_id: r.id,
			expired_at: null,
			product_id: 'prod_OF8wKOVKrYa9Bv',
			price_id: 'price_1NSeetH3ShbgzS1OC9jNUugA',
			created_at: {
				seconds: 1693389554,
				nanoseconds: 758000000
			},
			subscription_id: 'sub_1NYrflH3ShbgzS1O6OOSMOtu',
			key: 'beginner_monthly'
		};
	user.set(r);
	if (deep) await user.getRelatedData();
};

user.subscribe((v: any) => {
	if (!browser) return;
	if (!v) {
		localStorage.removeItem('user');
		return;
	}
	localStorage.setItem('user', JSON.stringify(v));
});

export default user;
