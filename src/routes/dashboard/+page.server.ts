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

const getHormoneHealth = async () => {
    const result = await insights.getInsights({
        type: 'hormone_health'
    });
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
}

type Response = {
    activity: Activity;
    nutritional_guidance: Insight;
    hormone_health: Insight;
};

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    const [
        randomActivity,
        randomNutritionalGuidance,
        randomHormoneHealth,
    ] = await Promise.all([
        getRandomActivity(),
        getRandomNutritionalGuidance(),
        getHormoneHealth(),
    ]);
    const response: Response = {
        activity: randomActivity,
        nutritional_guidance: randomNutritionalGuidance,
        hormone_health: randomHormoneHealth,
    };
	return response;
}