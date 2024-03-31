/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, and, doc, setDoc, limit, deleteDoc, where } from "firebase/firestore";
import { differenceInDays, startOfDay } from "date-fns";
import { db } from "./_globals";
import { getActiveChallenges } from './challenges'

interface GetUserActiveChallengesContext {
  user_id: string;
};
export const getUserActiveChallenges = async (context: GetUserActiveChallengesContext) => {
  const q = query(
    collection(
      db,
      'users_challenges',
    ),
    and(
      where('user_id', '==', context?.user_id),
      where('completed', '==', false),
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

interface GetUserActiveChallengeContext {
  user_id: string;
  challenge_id: string;
};
export const getUserActiveChallenge = async (context: GetUserActiveChallengeContext) => {
  const q = query(
    collection(
      db,
      'users_challenges',
    ),
    and(
      where('user_id', '==', context?.user_id),
      where('challenge_id', '==', context?.challenge_id),
      where('completed', '==', false),
    ),
    limit(1),
  );
  const snapshot = await getDocs(q);
  const challenge = snapshot.docs[0]
    && {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0]?.data(),
  };
  return challenge;
};

interface CreateUserChallengeContext {
  user_id: string;
  challenge_id: string;
};
export const createUserChallenge = async (context: CreateUserChallengeContext) => {
  const challenge = await getUserActiveChallenge(context);
  let content;
  if (!challenge) {
    const ref = doc(collection(db, 'users_challenges'));
    content = {
      user_id: context?.user_id,
      challenge_id: context?.challenge_id,
      created_at: new Date(),
      updated_at: new Date(),
      completed: false,
    };
    await setDoc(ref, content);
    return {
      id: ref.id,
      ...content,
    };
  }
  return challenge;
};

interface DeleteUserChallengeContext {
  user_id: string;
  challenge_id: string;
};
export const deleteUserChallenge = async (context: DeleteUserChallengeContext) => {
  const challenge: any = await getUserActiveChallenge(context);
  // we won't remove the challenges that has content
  if (challenge?.content?.length) return;
  const ref = doc(db, 'users_challenges', challenge.id);
  await deleteDoc(ref);
  return ref;
};

interface UpdateUserChallengeContext {
  user_id: string;
  challenge_id: string;
  content: any;
};
export const updateUserChallenge = async (context: UpdateUserChallengeContext) => {
  const userChallenge: any = await getUserActiveChallenge(context);
  if (!userChallenge) return;
  const ref = doc(db, 'users_challenges', userChallenge?.id);
  const c = {
    user_id: userChallenge?.user_id,
    challenge_id: userChallenge?.challenge_id,
    completed: userChallenge?.completed,
    created_at: userChallenge?.created_at,
    updated_at: new Date(),
    content: userChallenge?.content,
  };
  const day = differenceInDays(startOfDay(new Date()), startOfDay(new Date(userChallenge.created_at.seconds * 1000)));
  // Users can only submit or edit 7 days for each challenge
  if (day > 6) return;
  if (!c.content) c.content = {};
  c.content[day] = {
    value: context.content,
    created_at: new Date(),
  };
  await setDoc(ref, c);
  return c;
};

interface GetAcceptedChallengesContext {
  user_id: string;
};
export const getAcceptedChallenges = async (context: GetAcceptedChallengesContext) => {
  const r = await getActiveChallenges();
  const challenges = Object.fromEntries(r.map((i) => [i.id, i]));
  const userChallenges = await getUserActiveChallenges({
    user_id: context.user_id,
  });
  return userChallenges.map((i) => ({
    ...i,
    challenge: challenges[i.challenge_id],
  }));
};

interface GetUserChallengesHistoryContext {
  user_id: string;
  from?: Date;
  to?: Date;
  completed?: boolean;
}
export const getUserChallengesHistory = async (context: GetUserChallengesHistoryContext) => {
  const criteria = [];
  if (!context.user_id) return [];
  criteria.push(
    where('user_id', '==', context.user_id),
  );
  if (context.from && context.to) {
    criteria.push(
      where('created_at', '>=', context.from),
      where('created_at', '<=', context.to),
    );
  }
  if ('completed' in context) {
    criteria.push(
      where('completed', '==', context.completed),
    );
  }
  const q = query(
    collection(
      db,
      'users_challenges',
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

export default {
  getUserActiveChallenges,
  getUserActiveChallenge,
  createUserChallenge,
  deleteUserChallenge,
  updateUserChallenge,
  getAcceptedChallenges,
  getUserChallengesHistory,
};