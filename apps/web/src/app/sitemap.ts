import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const base = 'https://flotify.dev'

	return [
		{ url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
		{ url: `${base}/docs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
		{ url: `${base}/docs/installation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
		{ url: `${base}/docs/quick-start`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
		{ url: `${base}/docs/trello-setup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
		{ url: `${base}/docs/configuration`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
		{ url: `${base}/docs/api-reference`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
		{ url: `${base}/docs/roadmap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
	]
}
