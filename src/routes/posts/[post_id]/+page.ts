/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	return {
		post_id: params.post_id
	};
};
