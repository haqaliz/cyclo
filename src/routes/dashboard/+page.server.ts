import {
    type Activity,
    type Insight,
    type Recommendation,
} from '$types';
import { activities, insights, recommendations } from '$firebase';

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
};

const getHormoneHealth = async () => {
    const result = await insights.getInsights({
        type: 'hormone_health'
    });
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getOtherProductRecommendation = async () => {
    const result = await recommendations.getOtherProductsRecommendations();
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getMenstruationProductRecommendation = async () => {
    const result = await recommendations.getMenstruationProductsRecommendations();
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

type Response = {
    activity: Activity;
    nutritional_guidance: Insight;
    hormone_health: Insight;
    other_product: Recommendation;
    menstruation_product: Recommendation;
};

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    const [
        randomActivity,
        randomNutritionalGuidance,
        randomHormoneHealth,
        otherProduct,
        menstruationProduct,
    ] = await Promise.all([
        getRandomActivity(),
        getRandomNutritionalGuidance(),
        getHormoneHealth(),
        getOtherProductRecommendation(),
        getMenstruationProductRecommendation(),
    ]);
    const response: Response = {
        activity: randomActivity,
        nutritional_guidance: randomNutritionalGuidance,
        hormone_health: randomHormoneHealth,
        other_product: otherProduct,
        menstruation_product: menstruationProduct,
    };
	return response;
}