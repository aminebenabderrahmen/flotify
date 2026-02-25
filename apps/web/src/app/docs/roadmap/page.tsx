import { H1, H2, P, Subtitle } from '@/components/docs-prose'
import { Check } from 'lucide-react'

const roadmap = [
	{
		phase: 'v0.1 — Now',
		status: 'done' as const,
		items: [
			'Trello integration',
			'Bug, Feature, Question types',
			'Auto screenshot (html2canvas)',
			'Drag & drop / paste screenshot',
			'Auto-collected metadata (URL, browser, screen, timestamp)',
			'Light & dark theme',
			'Framework-agnostic (vanilla JS)',
			'CDN + npm distribution',
		],
	},
	{
		phase: 'v0.2 — Next',
		status: 'planned' as const,
		items: [
			'GitHub Issues integration',
			'Customizable feedback types',
			'Callback hooks (onSubmit, onOpen, onClose)',
			'Custom fields support',
			'i18n (English, French, Spanish, Arabic)',
			'Keyboard shortcuts',
		],
	},
	{
		phase: 'v0.3 — Future',
		status: 'planned' as const,
		items: [
			'Linear integration',
			'Jira integration',
			'Notion integration',
			'Asana integration',
			'React wrapper (@flotify/react)',
			'Vue wrapper (@flotify/vue)',
			'Screen recording (video)',
			'User identification',
			'Proxy/serverless mode for API key security',
		],
	},
]

export default function RoadmapPage() {
	return (
		<div>
			<H1>Roadmap</H1>
			<Subtitle>
				Where Flotify is headed. We&apos;re building in public — follow along on GitHub.
			</Subtitle>

			<P>
				Flotify started with Trello because it&apos;s the tool most teams already use.
				But the architecture is designed from day one to support any project management
				tool. Each integration is a self-contained provider — adding a new one doesn&apos;t
				touch the core widget code.
			</P>

			<div className="mt-8 space-y-8">
				{roadmap.map((phase) => (
					<div key={phase.phase}>
						<H2>{phase.phase}</H2>
						<ul className="space-y-2 mt-4">
							{phase.items.map((item) => (
								<li key={item} className="flex items-start gap-3 text-sm">
									{phase.status === 'done' ? (
										<Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
									) : (
										<div className="h-4 w-4 rounded-full border border-gray-300 mt-0.5 shrink-0" />
									)}
									<span className={phase.status === 'done' ? 'text-gray-900' : 'text-gray-500'}>
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="mt-12 p-6 rounded-lg border border-gray-200 bg-white text-center">
				<h3 className="text-base font-semibold text-gray-900 mb-2">
					Want a specific integration?
				</h3>
				<p className="text-sm text-gray-500 mb-4">
					Open an issue on GitHub and let us know which tool you need.
				</p>
				<a
					href="https://github.com/aminebenabderrahmen/flotify/issues/new"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
				>
					Request an integration
				</a>
			</div>
		</div>
	)
}
