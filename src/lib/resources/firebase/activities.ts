/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, and, query, where, limit } from "firebase/firestore";
import { db } from "./_globals";

interface GetActivitiesContext {
    type?: string;
    limit: number;
};
export const getActivities = async (context: GetActivitiesContext) => {
    const criteria = [];
    const l = context?.limit > 100 ? 100 : context.limit;
    if (context?.type) {
        criteria.push(
            where('type', '==', context.type),
        );
    }
    const q = query(
        collection(
            db,
            'activities',
        ),
        and(
            ...criteria,
        ),
        limit(l),
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
    getActivities,
};