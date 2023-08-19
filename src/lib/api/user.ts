import { API_BASE_URL, REQ_OPTIONS } from '$config';

export const info = async () => {
	const r = await fetch(`${API_BASE_URL}/user/info`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
};

interface GetRecordedDayPayload {
	from: number;
	to: number;
}
export const getRecordedDays = async (payload: GetRecordedDayPayload) => {
	const params = new URLSearchParams({
		from: payload.from.toString(),
		to: payload.to.toString(),
	});
	const r = await fetch(
		`${API_BASE_URL}/user/recorded-days?${params}`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		},
	).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
};

export const getLatestMenstrualCycleStart = async () => {
	const r = await fetch(
		`${API_BASE_URL}/user/recorded-days/menstrual-cycles/latest/start`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		},
	).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
};

interface GetMenstrualCyclesPayload {
	from: number;
	to: number;
}
export const getMenstrualCycles = async (payload: GetMenstrualCyclesPayload) => {
	const params = new URLSearchParams({
		from: payload.from.toString(),
		to: payload.to.toString(),
	});
	const r = await fetch(
		`${API_BASE_URL}/user/recorded-days/menstrual-cycles?${params}`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		},
	).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
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

export default {
	info,
    getRecordedDays,
	getLatestMenstrualCycleStart,
	getMenstrualCycles,
	addRecordedDay,
	updateRecordedDay,
	subscribeForPlan,
};
