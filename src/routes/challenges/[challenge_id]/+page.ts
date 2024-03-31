/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	return {
		challenge_id: params.challenge_id
	};
};
