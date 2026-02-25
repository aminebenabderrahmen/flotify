import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
					<div>
						<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
							Free forever. Open source.
						</h2>
						<p className="mt-3 max-w-3xl text-lg text-gray-500">
							No subscriptions, no usage limits, no vendor lock-in. Your feedback, your
							Trello board, your rules. MIT licensed.
						</p>
					</div>
					<div className="mt-8 lg:mt-0 flex justify-center lg:justify-end gap-4">
						<a href="/docs/quick-start">
							<Button size="lg" className="text-base">
								Get started
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</a>
						<a
							href="https://github.com/aminebenabderrahmen/flotify"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button variant="outline" size="lg" className="text-base">
								View the code
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
