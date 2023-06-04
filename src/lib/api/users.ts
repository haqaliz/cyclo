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

export default {
    getRecordedDays,
};
