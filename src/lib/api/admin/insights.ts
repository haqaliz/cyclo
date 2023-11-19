import { API_BASE_URL, REQ_OPTIONS } from '$config';

interface CreateInsightPayload {
	type: string;
	name: string;
	content: Array<any>;
}
export const createInsight = async (payload: CreateInsightPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/insights`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface UpdateInsightPayload {
	insight_id: string;
	type: string;
	name: string;
	category: string;
	content: Array<any>;
}
export const updateInsight = async (payload: UpdateInsightPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/insights/${payload.insight_id}`, {
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

interface DeleteInsightPayload {
	insight_id: string;
}
export const deleteInsight = async (payload: DeleteInsightPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/insights/${payload.insight_id}`, {
		...REQ_OPTIONS,
		method: 'DELETE'
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface GetInsights {
	type: string;
}
export const getInsights = async (payload: GetInsights) => {
	const type = payload?.type ? `type=${payload.type}` : '';
	const r = await fetch(`${API_BASE_URL}/admin/insights?${type}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	createInsight,
	updateInsight,
	getInsights,
	deleteInsight
};
