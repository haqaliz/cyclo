import { API_BASE_URL, REQ_OPTIONS } from '$config';

export const getToken = async () => {
	const r = await fetch(`${API_BASE_URL}/user/token`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getPublicInfo = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/${payload.user_id}/info`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getInfo = async () => {
	const r = await fetch(`${API_BASE_URL}/user/info`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getRecommendations = async () => {
	const r = await fetch(`${API_BASE_URL}/user/recommendations`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

interface UpdateInfoPayload {
	prefs?: any;
	email?: string;
}
export const updateInfo = async (payload: UpdateInfoPayload) => {
	const r = await fetch(`${API_BASE_URL}/user/info`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return !!r?.ok;
};

interface GetRecordedDayPayload {
	from: number;
	to: number;
}
export const getRecordedDays = async (payload: GetRecordedDayPayload) => {
	const params = new URLSearchParams({
		from: payload.from.toString(),
		to: payload.to.toString()
	});
	let r = await fetch(`${API_BASE_URL}/user/recorded-days?${params}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

export const getLatestMenstrualCycleStart = async () => {
	let r = await fetch(`${API_BASE_URL}/user/recorded-days/menstrual-cycles/latest/start`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

interface GetMenstrualCyclesPayload {
	from: number;
	to: number;
}
export const getMenstrualCycles = async (payload: GetMenstrualCyclesPayload) => {
	const params = new URLSearchParams({
		from: payload.from.toString(),
		to: payload.to.toString()
	});
	let r = await fetch(`${API_BASE_URL}/user/recorded-days/menstrual-cycles?${params}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

export const addRecordedDay = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/recorded-day`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const updateRecordedDay = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/recorded-day/${payload.recorded_day_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const subscribeForPlan = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/subscribe`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface CreatePostPayload {
	parent_id: string;
	content: string;
}
export const createPost = async (payload: CreatePostPayload) => {
	const r = await fetch(`${API_BASE_URL}/user/posts`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const getPosts = async (payload: any) => {
	const startAfter = payload.start_after?.length ? `&start_after=${payload.start_after}` : '';
	const q = payload.query?.length ? `&query=${payload.query}` : '';
	const fromTo = payload.from && payload.to ? `&from=${payload.from}&to=${payload.to}` : '';
	const r = await fetch(
		`${API_BASE_URL}/user/posts?limit=${payload.limit}${startAfter}${fromTo}${q}`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		}
	).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getPost = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/posts/${payload.post_id}?comments=true`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const removePost = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/posts/${payload.post_id}`, {
		...REQ_OPTIONS,
		method: 'DELETE'
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const likePost = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/posts/${payload.post_id}/like`, {
		...REQ_OPTIONS,
		method: 'POST'
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const updateChallenge = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/challenges/${payload.challenge_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify({
			content: payload.content
		})
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	getToken,
	getPublicInfo,
	getInfo,
	getRecommendations,
	updateInfo,
	getRecordedDays,
	getLatestMenstrualCycleStart,
	getMenstrualCycles,
	addRecordedDay,
	updateRecordedDay,
	subscribeForPlan,
	createPost,
	getPosts,
	getPost,
	removePost,
	likePost,
	updateChallenge
};
