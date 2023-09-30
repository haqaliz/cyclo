import { API_BASE_URL, REQ_OPTIONS } from '$config';

export const list = async () => {
	const r = await fetch(`${API_BASE_URL}/products/list`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	list
};
