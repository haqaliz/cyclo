import { API_BASE_URL, REQ_OPTIONS } from '$config';

interface CreateRecommendationPayload {
	type: string;
	brand: string;
	url: string;
	img: string;
	price: Object;
	features: Array<any>;
}
export const createRecommendation = async (payload: CreateRecommendationPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/recommendations`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface UpdateRecommendationPayload {
	recommendation_id: string;
	type: string;
	brand: string;
	url: string;
	img: string;
	price: Object;
	features: Array<any>;
}
export const updateRecommendation = async (payload: UpdateRecommendationPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/recommendations/${payload.recommendation_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify({
			type: payload?.type,
			brand: payload?.brand,
			url: payload?.url,
			img: payload?.img,
			price: payload?.price,
			features: payload?.features
		})
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface DeleteRecommendationPayload {
	recommendation_id: string;
}
export const deleteRecommendation = async (payload: DeleteRecommendationPayload) => {
	const r = await fetch(`${API_BASE_URL}/admin/recommendations/${payload.recommendation_id}`, {
		...REQ_OPTIONS,
		method: 'DELETE'
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface GetRecommendations {
	type: string;
}
export const getRecommendations = async (payload: GetRecommendations) => {
	const type = payload?.type ? `type=${payload.type}` : '';
	const r = await fetch(`${API_BASE_URL}/admin/recommendations?${type}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	createRecommendation,
	updateRecommendation,
	deleteRecommendation,
	getRecommendations
};
