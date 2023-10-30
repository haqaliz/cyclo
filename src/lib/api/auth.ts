import { FIREBASE } from '$config';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword
} from 'firebase/auth';

interface Login {
	email: string;
	password: string;
}
export const login = async (payload: Login) => {
	const r = await signInWithEmailAndPassword(FIREBASE.AUTH, payload.email, payload.password).catch(
		(e) => e.mesage
	);
	if (!r || r?.code) return r;
	return {
		token: r.user.accessToken
	};
};

export const signup = async (payload: Login) => {
	const r = await createUserWithEmailAndPassword(
		FIREBASE.AUTH,
		payload.email,
		payload.password
	).catch((e) => e.mesage);
	if (!r || r?.code) return;
	return r.user;
};

export const logout = async () => {
	const r = await signOut(FIREBASE.AUTH).catch((e) => e.message);
	return r === undefined;
};

interface UpdateUserEmail {
	email: string | undefined;
}
export const updateUserEmail = async (payload: UpdateUserEmail) => {
	const r = await updateEmail(FIREBASE.AUTH.currentUser, payload.email).catch((e) => e.message);
	return r === undefined;
};

interface UpdateUserPassword {
	password: string | undefined;
}
export const updateUserPassword = async (payload: UpdateUserPassword) => {
	const r = await updatePassword(FIREBASE.AUTH.currentUser, payload.password).catch(
		(e) => e.message
	);
	return r === undefined;
};

export default {
	login,
	signup,
	logout,
	updateUserEmail,
	updateUserPassword
};
