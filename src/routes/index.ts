import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { user as usr, token as tkn } from '$stores';
import { page as pg } from '$app/stores';

export let loading = true;

export const pages = [
	{
		key: '/about',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: '/contact',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: '/privacy-policy',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: '/terms-and-conditions',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: '/explore',
		public: true,
		nav: true
	},
	{
		key: '/posts',
		public: true,
		nav: true
	},
	{
		key: '/login',
		public: true,
		noSession: true
	},
	{
		key: '/signup',
		public: true,
		noSession: true
	},
	{
		key: '/profile',
		private: true
	},
	{
		key: '/calendar',
		private: true
	},
	{
		key: '/analytics',
		private: true
	},
	{
		key: '/insight',
		private: true
	},
	{
		key: '/subscribe',
		private: true
	},
	{
		key: '/explore/me',
		private: true
	},
	{
		key: '/challenges',
		private: true
	}
];

export const permissions: any = {
	auth: new RegExp(
		`^(${pages
			.filter((i) => i.public && i.noSession)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	public: new RegExp(
		`^(${pages
			.filter((i) => i.public)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	withNav: new RegExp(
		`^(${pages
			.filter((i) => i.nav)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	withFooter: new RegExp(
		`^(${pages
			.filter((i) => i.footer)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	private: new RegExp(
		`^(${pages
			.filter((i) => i.private)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	)
};

let user: any;
let token: any;
let page: any;

export const redirects = async () => {
	if (!browser) return;
	usr.subscribe((v) => (user = v));
	tkn.subscribe((v) => (token = !v || v === 'null' ? null : v));
	pg.subscribe((v) => (page = v));
	if (
		!page.url.pathname.match(permissions.private) &&
		!page.url.pathname.match(permissions.public) &&
		page.url.pathname !== '/'
	) {
		loading = false;
		return;
	}
	if (!user && !token && permissions.private.test(page.url.pathname)) {
		loading = false;
		window.location.href = '/login';
		return;
	}
	if (!user && !token && permissions.public.test(page.url.pathname)) {
		loading = false;
		await goto(page.url);
		return;
	}
	if ((user || token) && permissions.auth.test(page.url.pathname)) {
		loading = false;
		await goto('/');
		return;
	}
	loading = false;
	await goto(page.url);
};

export default {
	loading,
	pages,
	permissions,
	redirects
};
