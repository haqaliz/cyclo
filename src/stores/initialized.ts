import { writable } from 'svelte/store';

const initialized = writable<boolean>(false);

export default initialized;
