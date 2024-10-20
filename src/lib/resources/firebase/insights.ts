/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, doc, where, query, and, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "./_globals";

interface GetInsightsContext {
    type: string;
};
export const getInsights = async (context: GetInsightsContext) => {
    const criteria = [];
    if (context?.type) {
        criteria.push(
            where('type', '==', context.type),
        );
    }
    criteria.push(
        where('deleted_at', '==', null),
    );
    const q = query(
        collection(
            db,
            'insights',
        ),
        and(
            ...criteria,
        ),
    );
    const snapshot = await getDocs(q);
    const res: any[] = [];
    snapshot.forEach((i) => res.push({
        id: i.id,
        ...i.data(),
    }));
    return res;
};

export default {
    getInsights,
}