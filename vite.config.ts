import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/local': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/local/, ''),
			},
			'/dev': {
				target: 'https://backend.cyclo.dev',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/dev/, ''),
			},
		},
		cors: true,
		port: 1880,
	},
	preview: {
		host: '0.0.0.0',
		port: 1880,
	},
	build: {
		chunkSizeWarningLimit: 1024,
		sourcemap: true,
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
