import { API_BASE_URL, REQ_OPTIONS } from '$config';

interface ContactPayload {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const contact = async (payload: ContactPayload) => {
	const r = await fetch(`${API_BASE_URL}/contact`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface ExplorePayload {
	query: string;
	limit: number;
	start_after: string;
}
export const explore = async (payload: ExplorePayload) => {
	const startAfter = payload.start_after?.length ? `&start_after=${payload.start_after}` : '';
	const q = payload.query?.length ? `&query=${payload.query}` : '';
	const r = await fetch(`${API_BASE_URL}/explore?limit=${payload.limit}${startAfter}${q}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const trends = async () => {
	const r = await fetch(`${API_BASE_URL}/trends`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	contact,
	explore,
	trends
};
