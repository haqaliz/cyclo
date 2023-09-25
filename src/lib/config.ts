const API_ORIGIN = {
	'development:local': '/local',
	development: 'https://195.248.241.217:8081',
	staging: 'https://195.248.241.217:8081',
	production: 'https://195.248.241.217:8081'
}[import.meta.env.MODE];
export const API_BASE_URL = `${API_ORIGIN}`;
export const REQ_OPTIONS = {
	redirect: 'follow',
	headers: {
		'Content-Type': 'application/json',
	},
};

export default {
	API_BASE_URL,
	REQ_OPTIONS,
};
