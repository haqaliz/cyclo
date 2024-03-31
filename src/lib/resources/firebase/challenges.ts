/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./_globals";
import { getPostsForChallenge } from './posts';
import { getUserActiveChallenge } from './users-challenges'
export const getActiveChallenges = async () => {
    const q = query(
        collection(
            db,
            'challenges',
        ),
        where('expired_at', '==', null),
    );
    const snapshot = await getDocs(q);
    const res: any[] = [];
    snapshot.forEach((i) => res.push({
        id: i.id,
        ...i.data(),
    }));
    return res;
};

interface GetChallengeByIdContext {
    user_id: string;
    challenge_id: string;
};
export const getChallenge = async (context: GetChallengeByIdContext) => {
    const challenges = await getActiveChallenges();
    const r = challenges.find((i) => i.id === context.challenge_id);
    const challengeComments = await getPostsForChallenge({
        parent_id: r.id,
    });
    const userChallenge = await getUserActiveChallenge({
        user_id: context.user_id,
        challenge_id: r.id,
    });
    return {
        ...r,
        comments: challengeComments,
        user_challenge: userChallenge,
    };
};

export default {
    getActiveChallenges,
    getChallenge,
};