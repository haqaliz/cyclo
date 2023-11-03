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

export const getAcceptedChallenges = async () => {
	let r = await fetch(`${API_BASE_URL}/challenges`, {
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

interface AcceptChallengePayload {
	challenge_id: string;
}
export const acceptChallenge = async (payload: AcceptChallengePayload) => {
	let r = await fetch(`${API_BASE_URL}/challenges/${payload.challenge_id}`, {
		...REQ_OPTIONS,
		method: 'POST'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

interface RejectChallengePayload {
	challenge_id: string;
}
export const rejectChallenge = async (payload: RejectChallengePayload) => {
	const r = await fetch(`${API_BASE_URL}/challenges/${payload.challenge_id}`, {
		...REQ_OPTIONS,
		method: 'DELETE'
	}).catch((e) => e.response);
	return r?.ok;
};

export default {
	list,
	getAcceptedChallenges,
	getChallenge,
	acceptChallenge,
	rejectChallenge
};
