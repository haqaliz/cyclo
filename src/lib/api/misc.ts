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

export default {
	contact
};
