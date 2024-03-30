/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, and, query, limit, where } from "firebase/firestore";
import { db } from "./_globals";

interface GetMiscellaneousListContext {
    key: string;
    limit?: number;
};
const getMiscellaneousList = async (context: GetMiscellaneousListContext) => {
    const criteria = [];
    const l = context?.limit > 100 ? 100 : context.limit;
    if (context?.key) {
        criteria.push(
            where('key', '==', context.key),
        );
    }
    const q = query(
        collection(
            db,
            'miscellaneous',
        ),
        and(...criteria),
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
    getMiscellaneousList,
};