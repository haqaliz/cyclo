import { API_BASE_URL, REQ_OPTIONS } from '$config';

interface CreatemMiscellaneousPayload {
	key: string;
	value: string;
	metadata: Array<any>;
}
export const createMiscellaneous = async (payload: CreatemMiscellaneousPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/miscellaneous`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface UpdateMiscellaneousPayload {
	miscellaneous_id: string;
	key: string;
	value: string;
	metadata: any;
}
export const updateMiscellaneous = async (payload: UpdateMiscellaneousPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/miscellaneous/${payload.miscellaneous_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify({
			key: payload?.key,
			value: payload?.value,
			metadata: payload?.metadata
		})
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface DeleteMiscellaneousPayload {
	miscellaneous_id: string;
}
export const deleteMiscellaneous = async (payload: DeleteMiscellaneousPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/miscellaneous/${payload.miscellaneous_id}`, {
		...REQ_OPTIONS,
		method: 'DELETE'
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface GetMiscellaneous {
	key: string;
}
export const getMiscellaneousList = async (payload: GetMiscellaneous) => {
	const key = payload?.key ? `key=${payload.key}` : '';
	const r = await fetch(`${API_BASE_URL}/admin/miscellaneous?${key}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	createMiscellaneous,
	updateMiscellaneous,
	deleteMiscellaneous,
	getMiscellaneousList
};
