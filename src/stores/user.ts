/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

interface User {
    uid: string;
    email: string|null;
    name: string|null;
    profile: string|null;
    admin?: boolean|null;
    prefs?: object|null;
};
const user: any = writable<User|null>(null);

user.get = async (v: any) => {
    const r = {
        uid: v.uid,
        email: v.email,
        name: v.displayName,
        profile: v.photoURL,
    };
    user.set(r);
};

export default user;
