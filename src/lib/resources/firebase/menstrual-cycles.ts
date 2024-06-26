/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, doc, getDoc, orderBy, and, limit, query, where } from "firebase/firestore";
import { subMonths, startOfMonth, endOfMonth, addDays, differenceInDays, differenceInMonths } from "date-fns";
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

const menstrualCyclesParams = (MCs: any, length: number) => {
    const MCLengths = length ?? MCs?.length;
    if (!MCLengths) return;
    // If the average cycle length is 28 days, a standard deviation of 2 days might be considered acceptable
    const numStdDev = 2;
    // Average MCs
    const MCMean = MCs.reduce((a: any, i: any) => {
        a += i.diff;
        return a;
    }, 0) / MCLengths;
    // Variance MCs
    const MCVariance = MCs.reduce((a: any, i: any) => {
        a += (i.diff - MCMean) ^ 2;
        return a;
    }, 0) / MCLengths;
    // Standard Deviation MCs
    const stdDev = Math.sqrt(Math.abs(MCVariance));
    // Acceptable range
    const lowerBound = MCMean - numStdDev * stdDev;
    const upperBound = MCMean + numStdDev * stdDev;
    return {
        mean: MCMean,
        variance: Math.abs(MCVariance),
        standard_deviation: stdDev,
        lower_bound: lowerBound,
        upper_bound: upperBound,
    };
};

interface GetHealthRegularityContext {
    user_id: string;
    from?: Date,
    to?: Date;
}
export const getHealthRegularity = async (context: GetHealthRegularityContext) => {
    const from = context?.from ?? subMonths(startOfMonth(new Date()), 6);
    const to = context?.to ?? endOfMonth(new Date());
    const q = query(
        collection(
            db,
            'menstrual_cycles',
        ),
        and(
            where('user_id', '==', context?.user_id),
            where('created_at', '>=', from),
            where('created_at', '<=', to),
        ),
        orderBy('created_at', 'asc'),
    );
    const snapshot = await getDocs(q);
    const res: any[] = [];
    snapshot.forEach((i) => res.push(i.data()));
    const MCs: any[] = [];
    res.forEach((i, k) => {
        if (!k) return;
        const prev = res[k - 1];
        const startOfMC = addDays(new Date(prev?.created_at?.seconds * 1000), 7);
        const endOfMC = new Date(i?.created_at?.seconds * 1000);
        MCs.push({
            from: startOfMC.getTime() / 1000,
            to: endOfMC.getTime() / 1000,
            recorded_day_id: i.recorded_day_id,
            diff: differenceInDays(endOfMC, startOfMC),
        });
    });
    const MCParams: any = menstrualCyclesParams(MCs, differenceInMonths(to, from));
    return {
        ...MCParams,
        cycles: MCs.map((i) => {
            const d = (i.diff - MCParams?.mean);
            let isRegular = true;
            let delta = 0;
            if (d < MCParams?.lower_bound) {
                delta = Math.abs(d - MCParams?.lower_bound);
            } else if (d > MCParams?.upper_bound) {
                delta = Math.abs(d - MCParams?.upper_bound);
            }
            if (delta > MCParams?.standard_deviation) isRegular = false;
            // TODO: we have to define a user pref for asking length of period in (short|normal|long)
            // TODO: specific health conditions may impact cycle regularity
            // TODO: need to get average of the symptoms, feelings, ... from those cycles to apply more accuracy
            return {
                ...i,
                is_regular: isRegular,
            };
        }),
    };
};

interface GetHealthScoreContext {
    user_id: string;
    from?: Date,
    to?: Date;
}
export const getHealthScore = async (context: GetHealthScoreContext) => {
    const r = await getHealthRegularity(context);
    const regularCycles = ((r?.cycles ?? []).reduce((a: any, i: any) => {
      if (i.is_regular) a += 1;
      return a;
    }, 0) * 100);
    return {
      score: regularCycles > 0 ? (regularCycles / (r?.cycles ?? []).length) : 0,
    };
  };

export default {
    getStartOfLastMenstrualCycleForUser,
    getHealthRegularity,
    getHealthScore,
};