import { writable } from 'svelte/store';

const loaded: unknown = writable<boolean|null>(null);

export default loaded;
