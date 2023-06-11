import { API_BASE_URL, REQ_OPTIONS } from '$config';

interface GetRecordedDayPayload {
	user_id: string;
	from: number;
	to: number;
}
export const getRecordedDays = async (payload: GetRecordedDayPayload) => {
	const params = new URLSearchParams({
		from: payload.from.toString(),
		to: payload.to.toString(),
	});
	const r = await fetch(
		`${API_BASE_URL}/users/${payload.user_id}/recorded-days?${params}`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		},
	).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
};

interface GetLatestMenstrualCycleStartPayload {
	user_id: string;
}
export const getLatestMenstrualCycleStart = async (payload: GetLatestMenstrualCycleStartPayload) => {
	const r = await fetch(
		`${API_BASE_URL}/users/${payload.user_id}/recorded-days/latest/start`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		},
	).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
};

export const addRecordedDay = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/users/${payload.user_id}/recorded-day`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const updateRecordedDay = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/users/${payload.user_id}/recorded-day/${payload.recorded_day_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export default {
    getRecordedDays,
	getLatestMenstrualCycleStart,
	addRecordedDay,
	updateRecordedDay,
};
