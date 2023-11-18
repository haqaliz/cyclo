import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { user as usr } from '$api';
import config from '$config';
import user from './user';

const token = writable((browser && localStorage.getItem('token')) || null);

token.check = async () => {
	const tokenExp: any = localStorage.getItem('token_exp');
	if (!tokenExp) {
		const r = await usr.getToken();
		if (r) {
			localStorage.setItem('token_exp', r?.exp);
		} else {
			token.set(null);
			user.set(null);
		}
	}
	if (Date.now() / 1000 > parseInt(tokenExp, 10)) {
		token.set(null);
		user.set(null);
		localStorage.removeItem('token_exp');
	}
};

token.subscribe((v: any) => {
	if (!browser) return;
	if (!v) {
		localStorage.removeItem('token');
		delete config.REQ_OPTIONS.headers['Authorization'];
		return;
	}
	localStorage.setItem('token', v);
	config.REQ_OPTIONS.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
});

export default token;
