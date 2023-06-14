import { user as usr } from '$api';
import { writable } from 'svelte/store';

const user = writable(null);

user.get = async () => {
    const r = await usr.info();
    if (!r) return;
    user.set(r);
};

export default user;