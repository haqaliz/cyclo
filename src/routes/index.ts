import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { user as usr } from '$stores';
import { page as pg } from '$app/stores';

export let loading = false;

export const setLoading = (v: boolean) => {
	loading = v;
};

export const pages = [
	{
		key: 'about',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: 'contact',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: 'privacy-policy',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: 'terms-and-conditions',
		public: true,
		nav: true,
		footer: true
	},
	{
		key: 'explore',
		public: true,
		nav: true
	},
	{
		key: 'login',
		public: true,
		noSession: true
	},
	{
		key: 'signup',
		public: true,
		noSession: true
	},
	{
		key: 'profile',
		private: true
	},
	{
		key: 'calendar',
		private: true
	},
	{
		key: 'analytics',
		private: true
	},
	{
		key: 'insight',
		private: true
	},
	{
		key: 'subscribe',
		private: true
	}
];

export const permissions: any = {
	auth: new RegExp(
		`^/(${pages
			.filter((i) => i.public && i.noSession)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	public: new RegExp(
		`^/(${pages
			.filter((i) => i.public)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	publicWithNav: new RegExp(
		`^/(${pages
			.filter((i) => i.public && i.nav)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	publicWithFooter: new RegExp(
		`^/(${pages
			.filter((i) => i.public && i.footer)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	),
	private: new RegExp(
		`^/(${pages
			.filter((i) => i.private)
			.map((i) => i.key)
			.join('|')})`,
		'i'
	)
};

let user: any;
let page: any;

export const redirects = async () => {
	if (!browser) return;
	usr.subscribe((v) => (user = v));
	pg.subscribe((v) => (page = v));
	if (!user) await usr.get();
	if (
		!page.url.pathname.match(permissions.private) &&
		!page.url.pathname.match(permissions.public) &&
		page.url.pathname !== '/'
	) {
		loading = false;
		return;
	}
	if (!user && !!page.url.pathname.match(permissions.private)) {
		loading = false;
		await goto('/login');
		return;
	}
	if (!user && !!page.url.pathname.match(permissions.public)) {
		loading = false;
		await goto(page.url);
		return;
	}
	if (user && !!page.url.pathname.match(permissions.auth)) {
		loading = false;
		await goto('/');
		return;
	}
	loading = false;
	await goto(page.url);
};

export default {
	loading,
	setLoading,
	pages,
	permissions,
	redirects
};
