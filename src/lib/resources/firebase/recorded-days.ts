/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, and, query, orderBy, limit, doc, getDoc, setDoc, where, getCountFromServer } from "firebase/firestore";
import { db } from "./_globals";
import { startOfDay, endOfDay, differenceInDays } from "date-fns";
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

interface GetStartOfLastMenstrualCycleForUserContext {
    user_id: string;
};
export const getStartOfLastMenstrualCycleForUser = async (context: GetStartOfLastMenstrualCycleForUserContext) => {
    const q = query(
        collection(
            db,
            'menstrual_cycles',
        ),
        where('user_id', '==', context.user_id),
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

interface AddRecordedDayForUserContext {
    user_id: string;
    created_at: Date;
    feelings?: Array<any>,
    symptoms?: Array<any>;
    vaginal_discharge?: Array<any>;
    misc?: Array<any>;
    bleeding_amount?: number;
    bleeding_type?: string;
    blood_color?: string;
    pregnancy_test?: string;
    sex_situation?: string;
    medications?: string;
};
export const addRecordedDayForUser = async (context: AddRecordedDayForUserContext) => {
    const q = query(
        collection(
            db,
            'recorded_days',
        ),
        and(
            where('user_id', '==', context?.user_id),
            where('created_at', '>=', startOfDay(context?.created_at)),
            where('created_at', '<=', endOfDay(context?.created_at)),
        ),
    );
    const snapshot = await getCountFromServer(q);
    const snapshotLength = snapshot.data()?.count;
    if (snapshotLength) {
        // duplicate recorded per day
        return false;
    }
    // MC stand for Menstrual Cycle
    const startOfMC = await getStartOfLastMenstrualCycleForUser({
        user_id: context?.user_id,
    });
    // Minimum MC days
    const MMD = 20;
    const MCStarted = !startOfMC
        || differenceInDays(context?.created_at, new Date(startOfMC?.created_at?.seconds * 1000)) > MMD;
    const ref = doc(collection(db, 'recorded_days'));
    await setDoc(ref, {
        ...context,
        ...MCStarted && {
            is_start: true,
        },
        updated_at: context.created_at,
    });
    if (MCStarted) {
        const mcRef = doc(collection(db, 'menstrual_cycles'));
        await setDoc(mcRef, {
            user_id: context?.user_id,
            recorded_day_id: ref.id,
            created_at: context?.created_at,
        });
    }
    return ref;
};

const updateRecordedDayForUser = async (context: any) => {
    const targetContext = structuredClone(context);
    delete targetContext.recorded_day_id;
    const ref = doc(db, 'recorded_days', context.recorded_day_id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return;
    const recordedDay = snapshot.data();
    await setDoc(ref, {
        ...recordedDay,
        ...context,
        updated_at: new Date(),
    });
    return ref;
};

export default {
    getRecordedDaysForUser,
    getStartOfLastMenstrualCycleForUser,
    addRecordedDayForUser,
    updateRecordedDayForUser,
};