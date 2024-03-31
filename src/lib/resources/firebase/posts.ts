/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, limit, startAfter, getDoc, setDoc, deleteDoc, doc, and, orderBy, where } from "firebase/firestore";
import { db } from "./_globals";

interface GetPostsForChallengeContext {
  parent_id: string;
  start_after?: string;
  from?: Date;
  to?: Date;
  limit?: number;
};
export const getPostsForChallenge = async (context: GetPostsForChallengeContext) => {
  const criteria = [];
  if (context.from && context.to) {
    criteria.push(
      where('created_at', '>=', context.from),
      where('created_at', '<=', context.to),
    );
  }
  if (context.parent_id) {
    criteria.push(
      where('parent_id', '==', context.parent_id),
      where('parent_type', '==', 'challenge'),
    );
  }
  const queryChain: any[] = [
    collection(
      db,
      'posts',
    ),
    and(...criteria),
    orderBy('created_at', 'desc'),
  ];
  if (context.start_after) {
    const sstartAfterSnapshot = await getDoc(doc(db, 'posts', context.start_after));
    queryChain.push(startAfter(sstartAfterSnapshot));
  }
  if (context.limit) queryChain.push(limit(context.limit));
  const q = query(...queryChain);
  const snapshot = await getDocs(q);
  const res: any[] = [];
  snapshot.forEach((i) => res.push({
    id: i.id,
    ...i.data(),
  }));
  return res;
};

export const createPostForUser = async (context: any) => {
  const ref = doc(collection(db, 'posts'));
  await setDoc(ref, {
    ...context,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return ref;
};

interface GetPostsForUserContext {
  parent_id: string;
  user_id: string;
  from?: Date;
  to?: Date;
  query?: string;
  start_after?: string;
  limit?: number;
};
const getPostsForUser = async (context: GetPostsForUserContext) => {
  const criteria = [];
  if (context.user_id) {
    criteria.push(
      where('user_id', '==', context?.user_id),
    );
  }
  if (context.from && context.to) {
    criteria.push(
      where('created_at', '>=', context.from),
      where('created_at', '<=', context.to),
    );
  }
  if (context.query) {
    criteria.push(
      where('hashtags', 'array-contains', context.query),
    );
  }
  if (context.parent_id) {
    criteria.push(
      where('parent_id', '==', context.parent_id),
      where('parent_type', '==', 'post'),
    );
  }
  const queryChain: any = [
    collection(db, 'posts'),
    and(...criteria),
    orderBy('created_at', 'desc'),
  ];
  if (context.start_after) {
    const sstartAfterSnapshot = await getDoc(doc(db, 'posts', context.start_after));
    queryChain.push(startAfter(sstartAfterSnapshot));
  }
  queryChain.push(limit(context.limit));
  const q = query(...queryChain);
  const snapshot = await getDocs(q);
  const res: any[] = [];
  snapshot.forEach((i) => res.push({
    id: i.id,
    ...i.data(),
  }));
  return res;
};

const getPostForUser = async (context: any) => {
  const ref = doc(db, 'posts', context.post_id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return;
  const post: any = {
    id: snapshot.id,
    ...snapshot.data(),
  };
  if (context.comments) {
    const comments = await getPostsForUser({
      user_id: context.user_id,
      parent_id: post.id,
    });
    post.comments = comments;
  }
  if (!context?.depth && post.parent_id) {
    const parent = await getPostForUser({
      post_id: post.parent_id,
      depth: 1,
    });
    post.parent = parent;
  }
  return post;
};

interface DeletePostForUserContext {
  user_id: string;
  post_id: string;
  depth?: number;
  comments?: any;
};
export const deletePostForUser = async (context: DeletePostForUserContext) => {
  const post = await getPostForUser(context);
  if (!post || post?.user_id !== context.user_id) return;
  const ref = doc(db, 'posts', post.id);
  await deleteDoc(ref);
  return ref;
};

interface LikePostForUserContext {
  user_id: string;
  post_id: string;
};
export const likePostForUser = async (context: LikePostForUserContext) => {
  const post = await getPostForUser(context);
  if (!post) return;
  const ref = doc(db, 'posts', post?.id);
  if (!post.likes) post.likes = {};
  if (context.user_id in post.likes) {
    delete post.likes[context.user_id];
  } else {
    post.likes[context.user_id] = new Date();
  }
  const content = {
    ...post,
    likes: post.likes,
  };
  await setDoc(ref, content);
  return ref;
};

export default {
  getPostsForChallenge,
  createPostForUser,
  deletePostForUser,
  likePostForUser,
};