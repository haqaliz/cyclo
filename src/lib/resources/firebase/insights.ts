/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, where, query, and, getDocs } from "firebase/firestore";
import { db } from "./_globals";

interface GetInsightsContext {
    type: string;
};
export const getInsights = async (context: GetInsightsContext) => {
    const criteria = [];
    const type = context?.type ?? 'insight';
    criteria.push(
        where('type', '==', type),
    );
    if (type === 'insight') {
        criteria.push(
            where('deleted_at', '==', null),
        );
    }
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
    snapshot.forEach((i) => {
        if (i.data()?.deleted_at != null) return;
        res.push({
            id: i.id,
            ...i.data(),
        });
    });
    return res;
};

export default {
    getInsights,
}