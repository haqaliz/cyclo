import { collection, getDocs, doc, getDoc, orderBy, limit, query, where } from "firebase/firestore";
import { db } from "./_globals";

interface GetStartOfLastMenstrualCycleForUserContext {
    user_id: string;
};
export const getStartOfLastMenstrualCycleForUser = async (context: GetStartOfLastMenstrualCycleForUserContext) => {
    const q = query(
        collection(
            db,
            'menstrual_cycles',
        ),
        where('user_id', '==', context?.user_id),
        orderBy('created_at', 'desc'),
        limit(1),
    );
    const mcSnapshot = await getDocs(q);
    if (!mcSnapshot.docs.length) return;
    const menstrualCycle = mcSnapshot.docs[0].data();
    const ref = doc(db, 'recorded_days', menstrualCycle?.recorded_day_id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return;
    const recordedDay = snapshot.data();
    return {
        id: snapshot.id, 
        ...recordedDay,
    };
};

export default {
    getStartOfLastMenstrualCycleForUser,
};