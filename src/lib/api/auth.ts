import { API_BASE_URL, REQ_OPTIONS } from '$config';

interface Login {
	email: string;
	password: string;
}
export const login = async (payload: Login) => {
	const r = await fetch(`${API_BASE_URL}/auth/login`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const logout = async () => {
	const r = await fetch(`${API_BASE_URL}/auth/logout`, {
		...REQ_OPTIONS,
		method: 'POST'
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const user = async () => {
	const r = await fetch(`${API_BASE_URL}/auth/user`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
};

export default {
	login,
	logout,
    user,
};
