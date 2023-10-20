import { user as usr } from '$api';
import { writable } from 'svelte/store';
import token from './token';
import plans from './plans';
import recommendations from './recommendations';

const user = writable(null);

user.get = async () => {
	if (localStorage.getItem('token')) token.set(localStorage.getItem('token'));
	const r = await usr.getInfo();
	if (!r) return;
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
	await Promise.all([
		plans.get(),
		recommendations.get(),
	]);
};

export default user;
