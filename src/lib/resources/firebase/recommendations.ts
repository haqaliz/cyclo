/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, and, query, where } from "firebase/firestore";
import { db } from "./_globals";
import { subDays } from "date-fns";
import { getUserMetadata } from './users-metadata';
import { getFlowIntensityForUser } from './flow-intensity-pattern';
import { getInsights } from './insights';
import { getActivities } from './activities';

interface GetMenstruationProductsRecommendationsContext {
    metadata: any;
};
const getMenstruationProductsRecommendations = async (context: GetMenstruationProductsRecommendationsContext) => {
    const prefs = context?.metadata?.prefs;
    // menstruation products recommendations
    const menstruationProducts = [];
    if (prefs?.menstruation_products?.tampon) menstruationProducts.push('tampon');
    if (prefs?.menstruation_products?.cup) menstruationProducts.push('cup');
    if (prefs?.menstruation_products?.pad) menstruationProducts.push('pad');
    const menstruationProductsBrands = Object.keys(prefs?.menstruation_products?.brands ?? {}).filter(
        (i) => prefs?.menstruation_products?.brands[i]
    );
    const queryChain = [
        collection(
            db,
            'recommendations',
        ),
    ];
    if (menstruationProductsBrands.length && menstruationProducts.length) {
        queryChain.push(and(
            where('brand', 'in', menstruationProductsBrands),
            where('type', 'in', menstruationProducts),
        ));
    }
    const q = query(...queryChain);
    const snapshot = await getDocs(q);
    const MP: any[] = [];
    snapshot.forEach((i) => MP.push({
        id: i.id,
        ...i.data(),
    }));
    return MP;
};

const getOtherProductsRecommendations = async () => {
    // other products recommendations
    const menstruationProducts = ['cup', 'pad', 'tampon'];
    const queryChain = [
        collection(
            db,
            'recommendations',
        ),
    ];
    queryChain.push(where('type', 'not-in', menstruationProducts));
    const q = query(...queryChain);
    const snapshot = await getDocs(q);
    const results: any[] = [];
    snapshot.forEach((i) => results.push({
        id: i.id,
        ...i.data(),
    }));
    return results;
};

interface GetRecommendationsForUserContext {
    user_id: string;
};
export const getRecommendationsForUser = async (context: GetRecommendationsForUserContext) => {
    const to = new Date();
    const from = subDays(to, 30);
    const metadata = await getUserMetadata({
        user_id: context?.user_id,
    });
    const [
        flowIntensityOverMonth,
        menstruationProducts,
        hormoneHealthInsights,
        nutritionalGuidances,
        recommendedActivities,
        otherProducts,
    ] = await Promise.all([
        getFlowIntensityForUser({
            user_id: context?.user_id,
            from,
            to,
        }),
        getMenstruationProductsRecommendations({ metadata }),
        getInsights({ type: 'hormone_health' }),
        getInsights({ type: 'nutritional_guidance' }),
        getActivities({ limit: 10 }),
        getOtherProductsRecommendations(),
    ]);
    const flowIntensity = flowIntensityOverMonth?.[0]?.flow_intensity ?? 0;
    const smartMenstruationProducts = menstruationProducts.filter((i) => {
        if (flowIntensity < 5.5) return i.type === 'pad';
        if (flowIntensity >= 5.5 && flowIntensity < 8) return i.type === 'tampon';
        // flowIntensity >= 8
        return i.type === 'cup';
    });
    return {
        menstruation_products: smartMenstruationProducts.length > 0 ? smartMenstruationProducts : menstruationProducts,
        hormone_health_insights: hormoneHealthInsights,
        nutritional_guidances: nutritionalGuidances,
        activities: recommendedActivities,
        other_products: otherProducts,
    };
};

export default {
    getRecommendationsForUser,
};