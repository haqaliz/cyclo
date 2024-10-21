import { type Insight } from '$types';
import { insights } from '$firebase';

type Response = {
    insights: Insight[];
};

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    const result = await insights.getInsights({
        type: 'insight',
    });
    const projectedResult = (result ?? [])
        .map((i: Insight) => ({
            id: i.id,
            category: i.category,
            classes: i.classes,
            key: i.key,
            name: i.name,
            type: i.type,
        }))
    const response: Response = {
        insights: projectedResult,
    };
	return response;
}