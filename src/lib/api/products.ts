import { API_BASE_URL, REQ_OPTIONS } from '$config';

export const plans = async () => {
	return {
		monthly: [
			{
				name: 'beginner',
			},
			{
				name: 'professional',
			},
			{
				name: 'enterprise',
			}
		],
		annually: [
			{
				name: 'beginner',
			},
			{
				name: 'professional',
			},
			{
				name: 'enterprise',
			}
		],
	};
	const r = await fetch(`${API_BASE_URL}/products/plans`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
    return r.json();
};

export default {
	plans,
};
