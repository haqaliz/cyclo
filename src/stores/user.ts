import { user as usr } from '$api';
import { writable } from 'svelte/store';
import plans from './plans';

const user = writable(null);

user.get = async () => {
    const r = await usr.info();
    if (!r) return;
    user.set(r);
    await plans.get();
};

export default user;