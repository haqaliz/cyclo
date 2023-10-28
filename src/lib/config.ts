import { browser } from '$app/environment';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_MEASUREMENT_ID
} from '$env/static/public';

export const DOMAIN = {
	'development:local': 'https://cyclotic-fc537.web.app/',
	development: 'https://cyclotic-fc537.web.app/',
	staging: 'https://cyclotic-fc537.web.app/',
	production: 'https://cyclo.dev/'
}[import.meta.env.MODE];
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

export const FIREBASE_APP = initializeApp({
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID,
	measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
});

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const FIREBASE = {
	APP: FIREBASE_APP,
	AUTH: FIREBASE_AUTH
};

export default {
	DOMAIN,
	API_BASE_URL,
	REQ_OPTIONS,
	FIREBASE
};
