/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, doc, where, query, and, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "./_globals";

interface CreateInsightContext {
    type: string;
    name: string;
    category: string;
    content: any;
};
export const createInsight = async (context: CreateInsightContext) => {
    const ref = doc(collection(db, 'insights'));
    await setDoc(ref, context);
    return ref;
};

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

interface UpdateInsightContext {
    insight_id: string;
};
export const updateInsight = async (context: UpdateInsightContext) => {
    const ref = doc(db, 'insights', context.insight_id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return;
    const sanitizedContext = structuredClone(context);
    delete sanitizedContext.insight_id;
    await setDoc(ref, {
      ...snapshot.data(),
      ...sanitizedContext,
    });
    return ref;
  };

export default {
    createInsight,
    getInsights,
    updateInsight,
};