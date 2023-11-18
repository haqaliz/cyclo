/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	return {
		conversation_id: params.conversation_id
	};
};
