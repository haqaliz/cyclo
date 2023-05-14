import { auth } from '$api';
import { writable } from 'svelte/store';

const user = writable(null);

user.get = async () => {
    const r = await auth.user();
    if (!r) return;
    user.set(r);
};

export default user;