/* eslint-disable @typescript-eslint/no-explicit-any */
import { challenges as chlng } from '$firebase';
import { writable } from 'svelte/store';

const challenges: any = writable<any|null>(null);

challenges.get = async () => {
	const r = await chlng.getActiveChallenges();
    const challengesByType: object = r.reduce((a, i) => {
        const type = i.type?.toLowerCase()?.replace(/[ -_]+/g, '_');
        if (!a[type]) a[type] = [];
        a[type].push({
          id: i.id,
          img: i.img,
          type: i.type,
          value: i.value,
        });
        return a;
      }, {});
	if (!challengesByType) return;
	challenges.byId = Object.fromEntries(
		Object.values(challengesByType ?? {})
			.reduce((a: any, i: any) => {
				a = [...a, ...i];
				return a;
			}, [])
			.map((i: any) => [i.id, i])
	);
	challenges.set(challengesByType);
};

challenges.withId = (id: string) => challenges?.byId?.[id] ?? {};

export default challenges;
