/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { users_metadata } from '$firebase';

interface User {
    uid: string;
    email: string|null;
    name: string|null;
    profile: string|null;
    admin?: boolean|null;
    prefs?: object|null;
};
const user = writable<User|null>(null);

user.get = async (v: any) => {
    const r = {
        uid: v.uid,
        email: v.email,
        name: v.displayName,
        profile: v.photoURL,
    };
    const metadata = await users_metadata.getUserMetadata({
        user_id: v.uid,
    });
    if (!metadata) {
        await users_metadata.upsertUserMetadata({
            user_id: v.uid,
            email: v.email,
            prefs: {},
        });
    }
    if (metadata?.admin) r.admin = true;
    if (metadata?.prefs) r.prefs = metadata.prefs;
    user.set(r);
};

export default user;
