import { type Activity, type Insight } from '$types';
import { activities, insights } from '$firebase';

const getRandomActivity = async () => {
    const result = await activities.getActivities();
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getRandomNutritionalGuidance = async () => {
    const result = await insights.getInsights({
        type: 'nutritional_guidance'
    });
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
}

type Response = {
    activity: Activity;
    nutritional_guidance: Insight;
};

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    const [
        randomActivity,
        randomNutritionalGuidance,
    ] = await Promise.all([
        getRandomActivity(),
        getRandomNutritionalGuidance(),
    ]);
    const response: Response = {
        activity: randomActivity,
        nutritional_guidance: randomNutritionalGuidance,
    };
	return response;
}