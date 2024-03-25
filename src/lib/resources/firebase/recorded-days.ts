import { collection, getDocs, and, query, where } from "firebase/firestore";
import { db } from "./_globals";

interface GetRecordedDaysForUserContext {
    user_id: string;
    from: Date;
    to: Date;
};
export const getRecordedDaysForUser = async (context: GetRecordedDaysForUserContext) => {
    const q = query(
        collection(
            db,
            'recorded_days',
        ),
        and(
            where('user_id', '==', context?.user_id),
            where('created_at', '>=', context?.from),
            where('created_at', '<=', context?.to),
        ),
    );
    const snapshot = await getDocs(q);
    const r: any = [];
    snapshot.forEach((i) => {
        const d = i.data();
        r.push({ id: i.id, ...d });
    });
    return r;
};

export default {
    getRecordedDaysForUser,
};