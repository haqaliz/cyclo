import { type Activity } from '$types';
import { activities } from '$firebase';

type Response = {
    activity: Activity;
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const result = await activities.getActivities();
    const projectedResult = (result ?? []);
    const randomOrDefault = projectedResult[
        Math.floor(Math.random() * projectedResult.length)
    ] ?? {};
    const response: Response = {
        activity: randomOrDefault,
    };
	return response;
}