/* eslint-disable @typescript-eslint/no-explicit-any */
import { miscellaneous as misc } from '$firebase';
import { writable } from 'svelte/store';

const miscellaneous: any = writable<any|null>(null);

miscellaneous.get = async () => {
	const r = await misc.getMiscellaneousList({
		key: 'brand',
	});
	miscellaneous.set(r);
};

export default miscellaneous;
