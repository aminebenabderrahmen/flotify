'use client'

import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

const codeLines = [
	{ type: 'import', content: "import { Flotify } from '@flotify/widget'" },
	{ type: 'blank', content: '' },
	{ type: 'call', content: 'Flotify.init({' },
	{ type: 'config', content: "  provider: 'trello'," },
	{ type: 'config', content: '  trello: {' },
	{ type: 'config', content: "    apiKey: 'your-api-key'," },
	{ type: 'config', content: "    token: 'your-token'," },
	{ type: 'config', content: "    listId: 'your-list-id'," },
	{ type: 'config', content: '  },' },
	{ type: 'call', content: '})' },
]

const fullCode = codeLines.map((l) => l.content).join('\n')

export function CodeSnippet() {
	const [visibleLines, setVisibleLines] = useState(0)
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			setVisibleLines((prev) => {
				if (prev >= codeLines.length) {
					clearInterval(timer)
					return prev
				}
				return prev + 1
			})
		}, 100)
		return () => clearInterval(timer)
	}, [])

	const copyToClipboard = () => {
		navigator.clipboard.writeText(fullCode)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Three lines. That&apos;s it.
					</h2>
					<p className="mt-3 text-lg text-gray-500">
						Install the package, init with your Trello credentials, done.
					</p>
				</div>

				<div className="max-w-2xl mx-auto">
					<div className="rounded-lg overflow-hidden bg-gray-900 shadow-lg">
						<div className="flex justify-between items-center p-4">
							<div className="flex space-x-2">
								<div className="w-3 h-3 rounded-full bg-red-500" />
								<div className="w-3 h-3 rounded-full bg-yellow-500" />
								<div className="w-3 h-3 rounded-full bg-green-500" />
							</div>
							<button
								onClick={copyToClipboard}
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="Copy to clipboard"
							>
								{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
							</button>
						</div>
						<div className="px-4 pb-4 font-mono text-sm leading-relaxed">
							{codeLines.map((line, i) => (
								<div
									key={i}
									className={`${i >= visibleLines ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
								>
									{line.type === 'blank' ? (
										<br />
									) : line.type === 'import' ? (
										<>
											<span className="text-purple-400">import</span>
											<span className="text-gray-300"> {'{ '}</span>
											<span className="text-yellow-300">Flotify</span>
											<span className="text-gray-300">{' }'} </span>
											<span className="text-purple-400">from</span>
											<span className="text-green-400"> &apos;@flotify/widget&apos;</span>
										</>
									) : (
										<span className={line.type === 'config' ? 'text-gray-300' : 'text-blue-300'}>
											{line.content}
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
