import type { Insight } from '$types';
import { insights } from '$firebase';

type Response = {
    insight: Insight;
};

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
    const result = await insights.getInsightByKey({
        type: 'insight',
        key: params.insight_key,
    });
    const projectedResult = result ?? {};
    const response: Response = {
        insight: projectedResult,
    };
	return response;
}