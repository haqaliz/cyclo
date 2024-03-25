import { writable } from 'svelte/store';

interface User {
    uid: string;
    email: string|null;
    name: string|null;
    profile: string|null;
    admin?: boolean|null;
    prefs?: object|null;
};
const user = writable<User|null>(null);

export default user;
