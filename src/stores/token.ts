import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import config from '$config';

const token = writable((browser && localStorage.getItem('token')) || null);

token.subscribe((v: any) => {
	if (!browser) return;
	localStorage.setItem('token', v);
	config.REQ_OPTIONS.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
});

export default token;
