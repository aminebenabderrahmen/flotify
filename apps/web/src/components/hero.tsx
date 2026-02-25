'use client'

import { useState } from 'react'
import { ArrowRight, Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

const installCommand = 'npm install @flotify/widget'

export function Hero() {
	const [copied, setCopied] = useState(false)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(installCommand)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<section className="py-20 sm:py-32">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
						Collect feedback.
						<span className="block text-gray-400">Push to your board.</span>
					</h1>

					<p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
						Open-source feedback widget for your website. Bug reports, feature requests,
						and questions — synced directly to Trello. One install, three lines of code.
					</p>

					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
								Star on GitHub
							</Button>
						</a>
					</div>

					<div className="mt-8 flex justify-center">
						<button
							onClick={copyToClipboard}
							className="group flex items-center gap-3 bg-gray-900 text-gray-300 px-5 py-3 rounded-full text-sm font-mono hover:bg-gray-800 transition-colors"
						>
							<span className="text-green-400">$</span>
							{installCommand}
							{copied ? (
								<Check className="h-4 w-4 text-green-400" />
							) : (
								<Copy className="h-4 w-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
							)}
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
