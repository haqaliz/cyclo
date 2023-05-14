const API_ORIGIN = {
	development: '/local',
	staging: 'STAGING_URL',
	production: 'PROD_URL'
}[import.meta.env.MODE];
export const API_BASE_URL = `${API_ORIGIN}`;
export const REQ_OPTIONS = {
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
};

export default {
	API_BASE_URL,
	REQ_OPTIONS,
};
