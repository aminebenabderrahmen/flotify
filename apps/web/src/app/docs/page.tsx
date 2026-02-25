import Link from 'next/link'
import { H1, Subtitle, P } from '@/components/docs-prose'
import { ArrowRight, Download, Rocket, Settings, Code, Map } from 'lucide-react'

const guides = [
	{
		icon: Download,
		title: 'Installation',
		description: 'Install the package in your project with npm, pnpm, or yarn.',
		href: '/docs/installation',
	},
	{
		icon: Rocket,
		title: 'Quick Start',
		description: 'Get the widget running in under 2 minutes with 3 lines of code.',
		href: '/docs/quick-start',
	},
	{
		icon: Settings,
		title: 'Trello Setup Guide',
		description: 'Complete walkthrough: API key, token, list ID, and board configuration.',
		href: '/docs/trello-setup',
	},
	{
		icon: Settings,
		title: 'Configuration',
		description: 'Customize position, theme, colors, and behavior.',
		href: '/docs/configuration',
	},
	{
		icon: Code,
		title: 'API Reference',
		description: 'Full reference for all methods, types, and options.',
		href: '/docs/api-reference',
	},
	{
		icon: Map,
		title: 'Roadmap',
		description: 'Upcoming integrations and planned features.',
		href: '/docs/roadmap',
	},
]

export default function DocsPage() {
	return (
		<div>
			<H1>Documentation</H1>
			<Subtitle>
				Everything you need to add a feedback widget to your site and sync it with Trello.
			</Subtitle>

			<P>
				Flotify is an open-source, framework-agnostic widget that collects user feedback
				(bugs, feature requests, questions) and pushes it directly to your Trello board.
				No backend required, no account to create — just install, configure, done.
			</P>

			<div className="grid sm:grid-cols-2 gap-3 mt-8">
				{guides.map((guide) => (
					<Link
						key={guide.href}
						href={guide.href}
						className="group flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all"
					>
						<div className="flex items-center justify-center h-9 w-9 rounded-md bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors shrink-0">
							<guide.icon className="h-4 w-4" />
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-center justify-between">
								<h3 className="text-sm font-medium text-gray-900">{guide.title}</h3>
								<ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-gray-500 transition-colors" />
							</div>
							<p className="text-sm text-gray-500 mt-0.5">{guide.description}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
