'use client'

import { useEffect, useState } from 'react'

export function LiveDemo() {
	const [demoState, setDemoState] = useState<'idle' | 'form' | 'success'>('idle')

	useEffect(() => {
		// Cycle through demo states for visual effect
		const interval = setInterval(() => {
			setDemoState((prev) => {
				if (prev === 'idle') return 'form'
				if (prev === 'form') return 'success'
				return 'idle'
			})
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						See it in action
					</h2>
					<p className="mt-3 text-lg text-gray-500">
						This is exactly what your users will see. Clean, fast, native-feeling.
					</p>
				</div>

				<div className="max-w-sm mx-auto">
					{/* Browser mockup */}
					<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
						{/* Browser chrome */}
						<div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
							<div className="flex gap-1.5">
								<div className="w-2.5 h-2.5 rounded-full bg-red-400" />
								<div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
								<div className="w-2.5 h-2.5 rounded-full bg-green-400" />
							</div>
							<div className="flex-1 mx-4">
								<div className="bg-white rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-400 text-center">
									yourapp.com
								</div>
							</div>
						</div>

						{/* Page content */}
						<div className="relative p-6 min-h-[400px] bg-gray-50">
							{/* Fake page content */}
							<div className="space-y-3">
								<div className="h-4 bg-gray-200 rounded w-3/4" />
								<div className="h-3 bg-gray-100 rounded w-full" />
								<div className="h-3 bg-gray-100 rounded w-5/6" />
								<div className="h-8 bg-gray-200 rounded-full w-32 mt-4" />
								<div className="h-3 bg-gray-100 rounded w-full mt-6" />
								<div className="h-3 bg-gray-100 rounded w-4/5" />
								<div className="h-3 bg-gray-100 rounded w-3/4" />
							</div>

							{/* Widget demo */}
							{demoState === 'idle' && (
								<button
									onClick={() => setDemoState('form')}
									className="absolute bottom-4 right-4 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
								>
									<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
									</svg>
								</button>
							)}

							{demoState === 'form' && (
								<div
									className="absolute bottom-4 right-4 w-[280px] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-in"
									style={{ animation: 'flotify-demo-in 0.15s ease-out' }}
								>
									<div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
										<span className="text-xs font-semibold text-gray-900">Report feedback</span>
										<button
											onClick={() => setDemoState('idle')}
											className="text-gray-400 hover:text-gray-900 text-xs cursor-pointer"
										>
											✕
										</button>
									</div>
									<div className="p-4 space-y-3">
										{/* Type pills */}
										<div>
											<div className="text-[10px] font-medium text-gray-500 mb-1.5">Type</div>
											<div className="flex gap-1.5">
												{['🐛 Bug', '✨ Feature', '❓ Question'].map((t, i) => (
													<div
														key={t}
														className={`flex-1 text-center text-[10px] py-1.5 rounded-full border transition-colors ${
															i === 0
																? 'border-gray-900 bg-gray-900/5 text-gray-900 font-medium'
																: 'border-gray-200 text-gray-400'
														}`}
													>
														{t}
													</div>
												))}
											</div>
										</div>
										{/* Title */}
										<div>
											<div className="text-[10px] font-medium text-gray-500 mb-1.5">
												Title <span className="text-red-400">*</span>
											</div>
											<div className="border border-gray-200 rounded-full px-3 py-1.5 text-[10px] text-gray-400">
												Button not working on mobile
											</div>
										</div>
										{/* Description */}
										<div>
											<div className="text-[10px] font-medium text-gray-500 mb-1.5">Description</div>
											<div className="border border-gray-200 rounded-lg px-3 py-2 text-[10px] text-gray-400 h-12">
												The submit button doesn&apos;t respond...
											</div>
										</div>
									</div>
									{/* Footer */}
									<div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-100">
										<button
											onClick={() => setDemoState('idle')}
											className="px-3 py-1.5 text-[10px] font-medium border border-gray-200 rounded-full text-gray-600 cursor-pointer"
										>
											Cancel
										</button>
										<button
											onClick={() => setDemoState('success')}
											className="px-3 py-1.5 text-[10px] font-medium bg-gray-900 text-white rounded-full cursor-pointer"
										>
											Submit
										</button>
									</div>
								</div>
							)}

							{demoState === 'success' && (
								<div
									className="absolute bottom-4 right-4 w-[280px] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
									style={{ animation: 'flotify-demo-in 0.15s ease-out' }}
								>
									<div className="p-8 text-center">
										<svg className="w-8 h-8 text-green-500 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<circle cx="12" cy="12" r="10" />
											<path d="m9 12 2 2 4-4" />
										</svg>
										<div className="text-sm font-semibold text-gray-900 mb-1">Thank you!</div>
										<div className="text-xs text-gray-500">Your feedback has been submitted.</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<style>{`
				@keyframes flotify-demo-in {
					from { opacity: 0; transform: translateY(8px); }
					to { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</section>
	)
}
