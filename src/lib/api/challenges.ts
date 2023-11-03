import { API_BASE_URL, REQ_OPTIONS } from '$config';

export const list = async () => {
	let r = await fetch(`${API_BASE_URL}/challenges/list`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

interface GetChallengePayload {
	challenge_id: string;
}
export const getChallenge = async (payload: GetChallengePayload) => {
	let r = await fetch(`${API_BASE_URL}/challenges/${payload.challenge_id}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

export default {
	list,
	getChallenge
};
