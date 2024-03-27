/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, limit, doc, setDoc, query, where } from "firebase/firestore";
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

const upsertUserMetadata = async (context: any) => {
    const metadata = await getUserMetadata(context);
    let content;
    if (!metadata) {
      const ref = doc(collection(db, 'users_metadata'));
      content = {
        user_id: context?.user_id,
        email: context?.email,
        prefs: context?.prefs,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await setDoc(ref, content);
      return content;
    }
    const ref = doc(db, 'users_metadata', metadata?.id);
    content = {
      user_id: metadata?.user_id,
      email: context?.email ? context?.email : metadata?.email,
      prefs: {
        ...metadata?.prefs,
        ...context?.prefs,
      },
      admin: metadata?.admin,
      created_at: metadata?.created_at,
      updated_at: new Date(),
    };
    await setDoc(ref, content);
    const uphRef = doc(collection(db, 'users_preferences_history'));
    const uphContent = {
      user_id: metadata?.user_id,
      ...metadata?.prefs,
      ...context?.prefs,
      created_at: metadata?.created_at,
    };
    await setDoc(uphRef, uphContent);
    return content;
  };

export default {
    getUserMetadata,
    upsertUserMetadata,
};