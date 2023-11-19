import { API_BASE_URL, REQ_OPTIONS } from '$config';

interface CreateActivityPayload {
	type: string;
	name: string;
	content: Array<any>;
}
export const createActivity = async (payload: CreateActivityPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/activities`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface UpdateActivityPayload {
	activity_id: string;
	type: string;
	name: string;
	category: string;
	content: Array<any>;
}
export const updateActivity = async (payload: UpdateActivityPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/activities/${payload.activity_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify({
			type: payload?.type,
			name: payload?.name,
			category: payload?.category,
			content: payload?.content
		})
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface DeleteActivityPayload {
	activity_id: string;
}
export const deleteActivity = async (payload: DeleteActivityPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/activities/${payload.activity_id}`, {
		...REQ_OPTIONS,
		method: 'DELETE'
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface GetActivities {
	type: string;
}
export const getActivities = async (payload: GetActivities) => {
	const type = payload?.type ? `type=${payload.type}` : '';
	const r = await fetch(`${API_BASE_URL}/admin/activities?${type}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	createActivity,
	updateActivity,
	deleteActivity,
	getActivities
};
