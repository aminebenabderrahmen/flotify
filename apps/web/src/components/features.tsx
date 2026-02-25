import { Bug, Zap, Shield, Palette, Monitor, Globe } from 'lucide-react'

const features = [
	{
		icon: Zap,
		title: 'Zero backend',
		description: 'Calls Trello API directly from the browser. No server to deploy or maintain.',
	},
	{
		icon: Globe,
		title: 'Framework agnostic',
		description: 'Works with React, Vue, Svelte, Angular, or plain HTML. One package, every stack.',
	},
	{
		icon: Monitor,
		title: 'Auto screenshot',
		description:
			'One-click page capture or drag & drop your own. Attached directly to the Trello card.',
	},
	{
		icon: Bug,
		title: 'Bug, Feature, Question',
		description:
			'Three built-in feedback types. Each creates a labeled, prioritized card on your board.',
	},
	{
		icon: Palette,
		title: 'Light & dark mode',
		description: 'Adapts to your site theme. Or set it manually. Looks native everywhere.',
	},
	{
		icon: Shield,
		title: 'Open source',
		description: 'MIT licensed, free forever. Inspect every line of code. No tracking, no analytics.',
	},
]

export function Features() {
	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Everything you need. Nothing you don&apos;t.
					</h2>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature) => (
						<div key={feature.title}>
							<div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-900 text-white">
								<feature.icon className="h-6 w-6" />
							</div>
							<div className="mt-5">
								<h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
								<p className="mt-2 text-base text-gray-500">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
