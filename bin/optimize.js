import { readdir, writeFile } from 'fs/promises';

const getDirectories = async (source) =>
	(await readdir(source, { withFileTypes: true }))
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

const getRoutes = async () => {
	const guidances = await getDirectories('./src/routes/insight/guidances');
	return [
		// {
		// 	path: '/analytics'
		// },
		// {
		// 	path: '/calendar'
		// },
		// {
		// 	path: '/calendar/detail'
		// },
		// {
		// 	path: '/insight'
		// },
		// ...guidances.map((i) => ({
		// 	path: `/insight/guidances/${i}`
		// })),
		{
			path: '/login'
		},
		{
			path: '/signup'
		},
		{
			path: '/about'
		},
		{
			path: '/contact'
		},
		{
			path: '/privacy-policy'
		},
		{
			path: '/terms-and-conditions'
		}
		// {
		// 	path: '/profile'
		// },
		// {
		// 	path: '/profile/account'
		// },
		// {
		// 	path: '/profile/preferences'
		// },
		// {
		// 	path: '/subscribe'
		// }
	];
};

const generateSitemap = async (host, dest) => {
	const routes = await getRoutes();
	let content = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>${host}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
  `;
	for (const route of routes) {
		content += `<url>
      <loc>${host}${route.path}</loc>
      <changefreq>${route.changefreq ?? 'daily'}</changefreq>
      <priority>${route.priority ?? '0.7'}</priority>
    </url>`;
	}
	content += '</urlset>';
	writeFile(dest, content);
};

const generateRobots = (host, dest) => {
	let content = 'User-agent: *\n';
	content += `Sitemap: ${host}\n`;
	writeFile(dest, content);
};

const main = async () => {
	const HOST = 'https://cyclo.dev';
	await generateSitemap(HOST, './build/sitemap.xml');
	await generateRobots(HOST, './build/robots.txt');
};

main();