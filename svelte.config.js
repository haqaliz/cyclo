import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const replace = [[/process\.env\.(\w+)/g, (_, prop) => JSON.stringify(process.env[prop])]];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			// to avoid import variables or mixins everytime
			prependData: `@import 'src/lib/scss/index.scss';`,
		},
		replace,
	}),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
		}),

		alias: {
			$config: 'src/lib/config.ts',
			$stores: 'src/stores',
			$styles: 'src/lib/scss/index.scss',
			$components: 'src/lib/components',
			$directives: 'src/directives',
			$api: 'src/lib/api',
		},
	},

	prerender: {
		default: true,
	},
};

export default config;
