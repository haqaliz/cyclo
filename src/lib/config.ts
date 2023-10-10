import { browser } from '$app/environment';

const API_ORIGIN = {
	'development:local': '/local',
	development: '/dev',
	staging: 'https://backend.cyclo.dev',
	production: 'https://backend.cyclo.dev'
}[import.meta.env.MODE];
export const API_BASE_URL = `${API_ORIGIN}`;
export const REQ_OPTIONS = {
	redirect: 'follow',
	headers: {
		'Content-Type': 'application/json',
		...(browser &&
			localStorage.getItem('token') && {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			})
	}
};

export default {
	API_BASE_URL,
	REQ_OPTIONS
};
