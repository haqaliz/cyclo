import {
    type Activity,
    type Insight,
    type Recommendation,
    type HealthRegularity,
    type HealthScore,
} from '$types';
import {
    activities,
    insights,
    recommendations,
    menstrualCycles,
} from '$firebase';

const getRandomActivity = async () : Promise<Activity> => {
    const result = await activities.getActivities();
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getRandomNutritionalGuidance = async () : Promise<Insight>  => {
    const result = await insights.getInsights({
        type: 'nutritional_guidance'
    });
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getHormoneHealth = async () : Promise<Insight> => {
    const result = await insights.getInsights({
        type: 'hormone_health'
    });
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getOtherProductRecommendation = async () : Promise<Recommendation> => {
    const result = await recommendations.getOtherProductsRecommendations();
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getMenstruationProductRecommendation = async () : Promise<Recommendation> => {
    const result = await recommendations.getMenstruationProductsRecommendations();
    const projectedResult = (result ?? []);
    return projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
};

const getHealthRegularity = async (uid: string) : Promise<HealthRegularity> => {
    const result = await menstrualCycles.getHealthRegularity({
        user_id: uid,
    });
    return result;
};

const getHealthScore = async (uid: string) : Promise<HealthScore> => {
    const result = await menstrualCycles.getHealthScore({
        user_id: uid,
    });
    return result;
};

type Response = {
    activity?: Activity;
    nutritional_guidance?: Insight;
    hormone_health?: Insight;
    other_product?: Recommendation;
    menstruation_product?: Recommendation;
    health_regularity?: HealthRegularity;
    health_score?: HealthScore;
};

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ cookies }) => {
    const uid = cookies.get('UID');
    const response: Response = {};
    if (!uid) return response;
    const [
        randomActivity,
        randomNutritionalGuidance,
        randomHormoneHealth,
        otherProduct,
        menstruationProduct,
        healthRegularity,
        healthScore,
    ] = await Promise.all([
        getRandomActivity(),
        getRandomNutritionalGuidance(),
        getHormoneHealth(),
        getOtherProductRecommendation(),
        getMenstruationProductRecommendation(),
        getHealthRegularity(uid),
        getHealthScore(uid),
    ]);
    response.activity = randomActivity;
    response.nutritional_guidance = randomNutritionalGuidance;
    response.hormone_health = randomHormoneHealth;
    response.other_product = otherProduct;
    response.menstruation_product = menstruationProduct;
    response.health_regularity = healthRegularity;
    response.health_score = healthScore;
	return response;
}