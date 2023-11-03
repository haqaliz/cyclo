import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { user as usr } from '$api';
import config from '$config';
import user from './user';

const token = writable((browser && localStorage.getItem('token')) || null);

token.check = async () => {
	const r = await usr.getToken();
	if (!r || Date.now() / 1000 > r?.exp) {
		token.set(null);
		user.set(null);
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
