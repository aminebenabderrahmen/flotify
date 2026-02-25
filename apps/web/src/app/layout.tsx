import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Flotify — Collect feedback. Push to your board.',
	description:
		'Open-source feedback widget for your website. Collect bug reports, feature requests, and questions — synced directly to Trello.',
	keywords: ['feedback', 'widget', 'trello', 'bug-report', 'open-source', 'flotify'],
	metadataBase: new URL('https://flotify.vercel.app'),
	openGraph: {
		title: 'Flotify — Collect feedback. Push to your board.',
		description:
			'Open-source feedback widget for your website. Bug reports, feature requests, and questions — synced directly to Trello. Free forever.',
		url: 'https://flotify.vercel.app',
		siteName: 'Flotify',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Flotify — Collect feedback. Push to your board.',
		description:
			'Open-source feedback widget. Bug reports, feature requests, questions → Trello. Free, no backend, 3 lines of code.',
	},
	robots: {
		index: true,
		follow: true,
	},
}

export const viewport: Viewport = {
	maximumScale: 1,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={manrope.className}>
			<body className="min-h-[100dvh] bg-gray-50 antialiased">{children}</body>
		</html>
	)
}
