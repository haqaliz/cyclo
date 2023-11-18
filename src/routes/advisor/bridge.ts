import { writable } from 'svelte/store';

export const newConversation = writable(false);

export default {
	newConversation
};
