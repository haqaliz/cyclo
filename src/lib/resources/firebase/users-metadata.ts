import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./_globals";

interface GetUserMetadataContext {
    user_id: string;
};
export const getUserMetadata = async (context: GetUserMetadataContext) => {
    const q = query(
        collection(
            db,
            'users_metadata',
        ),
        where('user_id', '==', context?.user_id),
        limit(1),
    );
    const snapshot = await getDocs(q);
    const r = snapshot.docs[0]
      && {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0]?.data(),
      };
    return r;
};

export default {
    getUserMetadata,
};