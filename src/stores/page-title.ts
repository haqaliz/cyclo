import { writable } from 'svelte/store';
const pageTitle = writable<string>('');

export default pageTitle;
