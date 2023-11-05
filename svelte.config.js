import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

// const replace = [[/process\.env\.(\w+)/g, (_, prop) => JSON.stringify(process.env[prop])]];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			precompress: false,
			strict: false,
			fallback: '200.html'
		}),

		alias: {
			$config: 'src/lib/config.ts',
			$stores: 'src/stores',
			$styles: 'src/lib/styles/index.css',
			$components: 'src/lib/components',
			$directives: 'src/lib/directives',
			$api: 'src/lib/api'
		}
	},

	prerender: {
		default: true
	}
};

export default config;
