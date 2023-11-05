/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	return {
		user_id: params.user_id
	};
};
