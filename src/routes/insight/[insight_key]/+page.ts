/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	return {
		insight_key: params.insight_key,
	};
};
