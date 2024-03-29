/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, and, query, where } from "firebase/firestore";
import { db } from "./_globals";

interface GetFlowIntensityForUserContext {
    user_id: string;
    from: Date;
    to: Date;
};
export const getFlowIntensityForUser = async (context: GetFlowIntensityForUserContext) => {
    const q = query(
        collection(
            db,
            'flow_intensity_pattern',
        ),
        and(
            where('user_id', '==', context?.user_id),
            where('created_at', '>=', context?.from),
            where('created_at', '<=', context?.to),
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
    getFlowIntensityForUser,
};