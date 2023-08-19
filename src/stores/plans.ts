import { products } from '$api';
import { writable } from 'svelte/store';

const plans = writable(null);

plans.get = async () => {
    const r = await products.list();
    if (!r) return;
    plans.set(r);
};

export default plans;