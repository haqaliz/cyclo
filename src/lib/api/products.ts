import { API_BASE_URL, REQ_OPTIONS } from '$config';

export const list = async () => {
	let r = await fetch(`${API_BASE_URL}/products/list`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

export default {
	list
};
