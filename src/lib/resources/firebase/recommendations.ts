/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./_globals";

// menstruation products recommendations
const getMenstruationProductsRecommendations = async () => {
    const menstruationProducts = ['cup', 'pad', 'tampon'];
    const queryChain: any[] = [
        collection(
            db,
            'recommendations',
        ),
    ];
    queryChain.push(where('type', 'in', menstruationProducts));
    const q = query(...queryChain);
    const snapshot = await getDocs(q);
    const results: any[] = [];
    snapshot.forEach((i) => results.push({
        id: i.id,
        ...i.data(),
    }));
    return results;
};

// Other Product
const getOtherProductsRecommendations = async () => {
    const menstruationProducts = ['cup', 'pad', 'tampon'];
    const queryChain: any[] = [
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

export default {
    getMenstruationProductsRecommendations,
    getOtherProductsRecommendations,
};