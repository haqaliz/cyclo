/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { insights as ins } from '$firebase';

interface Insight {
    id: string;
    type: string;
    name: string;
    category: string;
    content: any;
    deleted_at: Date|null;
};
const insights = writable<Array<Insight>|[]>([]);

insights.get = async () => {
    const r = await ins.getInsights({
        type: 'insight',
    });
    insights.set(r);
}

export default insights;
