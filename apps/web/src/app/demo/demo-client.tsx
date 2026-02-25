'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LogoIcon } from '@/components/logo'

const TRELLO_BOARD_URL = 'https://trello.com/b/PlrYgUSg/flotify'

function TrelloIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM10.44 17.25a1.31 1.31 0 0 1-1.32 1.31H5.56a1.31 1.31 0 0 1-1.31-1.31V6.19a1.31 1.31 0 0 1 1.31-1.31h3.56a1.31 1.31 0 0 1 1.32 1.31zm9.31-4.5a1.31 1.31 0 0 1-1.31 1.31h-3.56a1.31 1.31 0 0 1-1.32-1.31V6.19a1.31 1.31 0 0 1 1.32-1.31h3.56a1.31 1.31 0 0 1 1.31 1.31z" />
		</svg>
	)
}

function playSuccessSound() {
	try {
		const ctx = new AudioContext()
		const now = ctx.currentTime

		// First note - C5
		const osc1 = ctx.createOscillator()
		const gain1 = ctx.createGain()
		osc1.type = 'sine'
		osc1.frequency.value = 523.25
		gain1.gain.setValueAtTime(0.3, now)
		gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
		osc1.connect(gain1)
		gain1.connect(ctx.destination)
		osc1.start(now)
		osc1.stop(now + 0.15)

		// Second note - E5
		const osc2 = ctx.createOscillator()
		const gain2 = ctx.createGain()
		osc2.type = 'sine'
		osc2.frequency.value = 659.25
		gain2.gain.setValueAtTime(0.3, now + 0.1)
		gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25)
		osc2.connect(gain2)
		gain2.connect(ctx.destination)
		osc2.start(now + 0.1)
		osc2.stop(now + 0.25)

		// Third note - G5
		const osc3 = ctx.createOscillator()
		const gain3 = ctx.createGain()
		osc3.type = 'sine'
		osc3.frequency.value = 783.99
		gain3.gain.setValueAtTime(0.3, now + 0.2)
		gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.45)
		osc3.connect(gain3)
		gain3.connect(ctx.destination)
		osc3.start(now + 0.2)
		osc3.stop(now + 0.45)

		setTimeout(() => ctx.close(), 1000)
	} catch {
		// Audio not supported, silent fail
	}
}

export function DemoClient() {
	const [notifCount, setNotifCount] = useState(0)
	const [showPulse, setShowPulse] = useState(false)
	useEffect(() => {
		let destroyed = false

		import('@flotify/widget').then((mod) => {
			if (destroyed) return
			mod.Flotify.init({
				provider: 'trello',
				trello: {
					apiKey: process.env.NEXT_PUBLIC_TRELLO_API_KEY!,
					token: process.env.NEXT_PUBLIC_TRELLO_TOKEN!,
					listId: process.env.NEXT_PUBLIC_TRELLO_LIST_ID!,
				},
				position: 'bottom-right',
				theme: 'light',
				onSubmitSuccess: () => {
					playSuccessSound()
					setNotifCount((c) => c + 1)
					setShowPulse(true)
					setTimeout(() => setShowPulse(false), 2000)
				},
			})
		})

		return () => {
			destroyed = true
			import('@flotify/widget').then((mod) => mod.Flotify.destroy())
		}
	}, [])

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<Link href="/" className="flex items-center gap-2">
						<LogoIcon />
						<span className="text-xl font-bold text-gray-900">Flotify</span>
					</Link>
					<div className="flex items-center gap-3">
						<Link
							href="/"
							className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
						>
							<ArrowLeft className="h-3.5 w-3.5" />
							Back
						</Link>
						<a
							href={TRELLO_BOARD_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="relative group"
							onClick={() => setNotifCount(0)}
						>
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#0079BF] hover:bg-[#0079BF]/5 transition-all text-sm font-medium text-gray-600 hover:text-[#0079BF]">
								<TrelloIcon className="h-4 w-4" />
								View Board
							</div>
							{notifCount > 0 && (
								<span
									className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1 ${showPulse ? 'animate-bounce' : ''}`}
								>
									{notifCount}
								</span>
							)}
						</a>
					</div>
				</div>
			</header>

			{/* Hero */}
			<section className="py-12 sm:py-16">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6">
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
						Live Demo
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
						Try it yourself
					</h1>
					<p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
						This page has intentional UI bugs. Find them, report them
						using the Flotify bubble, then check the{' '}
						<a
							href={TRELLO_BOARD_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#0079BF] hover:underline underline-offset-2 font-medium"
						>
							Trello board
						</a>{' '}
						to see your ticket appear in real time.
					</p>
				</div>
			</section>

			{/* Buggy UI Examples */}
			<section className="pb-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2">
					{/* Bug 1: Overlapping text */}
					<div className="rounded-xl border border-gray-200 p-6 space-y-3">
						<span className="text-xs font-mono text-gray-400">
							components/card.tsx
						</span>
						<h3 className="text-base font-semibold text-gray-900">
							Pricing Card
						</h3>
						<div className="rounded-lg bg-gray-50 p-4">
							<p className="text-2xl font-bold text-gray-900">$12/mo</p>
							<p
								className="text-sm text-gray-500"
								style={{ marginTop: '-8px' }}
							>
								per user, billed annually
							</p>
							<p className="text-sm text-gray-500 mt-2">
								Includes 10 seats
							</p>
						</div>
					</div>

					{/* Bug 2: Button misalignment */}
					<div className="rounded-xl border border-gray-200 p-6 space-y-3">
						<span className="text-xs font-mono text-gray-400">
							components/actions.tsx
						</span>
						<h3 className="text-base font-semibold text-gray-900">
							Action Buttons
						</h3>
						<div className="rounded-lg bg-gray-50 p-4 flex gap-2 items-center">
							<button className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium">
								Save
							</button>
							<button
								className="px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-600"
								style={{ paddingTop: '12px', paddingBottom: '4px' }}
							>
								Cancel
							</button>
							<button className="px-4 py-2 rounded-full text-sm text-red-500 font-medium">
								Delete
							</button>
						</div>
					</div>

					{/* Bug 3: Truncated content */}
					<div className="rounded-xl border border-gray-200 p-6 space-y-3">
						<span className="text-xs font-mono text-gray-400">
							components/avatar.tsx
						</span>
						<h3 className="text-base font-semibold text-gray-900">
							User Profile
						</h3>
						<div className="rounded-lg bg-gray-50 p-4 flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
								JD
							</div>
							<div className="overflow-hidden" style={{ maxWidth: '100px' }}>
								<p className="font-medium text-sm text-gray-900 truncate">
									Jean-Baptiste De La Fontaine
								</p>
								<p className="text-xs text-gray-500 truncate">
									jean-baptiste.delafontaine@enterprise-corp.com
								</p>
							</div>
						</div>
					</div>

					{/* Bug 4: Wrong color contrast */}
					<div className="rounded-xl border border-gray-200 p-6 space-y-3">
						<span className="text-xs font-mono text-gray-400">
							components/badge.tsx
						</span>
						<h3 className="text-base font-semibold text-gray-900">
							Status Badges
						</h3>
						<div className="rounded-lg bg-gray-50 p-4 flex flex-wrap gap-2">
							<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
								Active
							</span>
							<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-300">
								Pending
							</span>
							<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-200">
								Overdue
							</span>
							<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-300">
								Draft
							</span>
						</div>
					</div>

					{/* Bug 5: Broken layout */}
					<div className="rounded-xl border border-gray-200 p-6 space-y-3">
						<span className="text-xs font-mono text-gray-400">
							components/stats.tsx
						</span>
						<h3 className="text-base font-semibold text-gray-900">
							Stats Grid
						</h3>
						<div className="rounded-lg bg-gray-50 p-4 grid grid-cols-3 gap-2">
							<div className="text-center">
								<p className="text-lg font-bold text-gray-900">1,234</p>
								<p className="text-xs text-gray-500">Users</p>
							</div>
							<div className="text-center">
								<p className="text-lg font-bold text-gray-900">
									99.9%
								</p>
								<p className="text-xs text-gray-500">Uptime</p>
							</div>
							<div className="text-center" style={{ transform: 'translateY(6px)' }}>
								<p className="text-lg font-bold text-gray-900">$48k</p>
								<p className="text-xs text-gray-500">Revenue</p>
							</div>
						</div>
					</div>

					{/* Bug 6: Z-index issue */}
					<div className="rounded-xl border border-gray-200 p-6 space-y-3">
						<span className="text-xs font-mono text-gray-400">
							components/tooltip.tsx
						</span>
						<h3 className="text-base font-semibold text-gray-900">
							Tooltip Overlap
						</h3>
						<div className="rounded-lg bg-gray-50 p-4 relative">
							<div className="flex gap-3 items-center">
								<div className="relative group cursor-pointer">
									<div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
										A
									</div>
									<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-100">
										Alice
									</div>
								</div>
								<div className="relative">
									<div className="w-8 h-8 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold" style={{ position: 'relative', zIndex: 10 }}>
										B
									</div>
								</div>
								<div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
									C
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="border-t border-gray-200 py-12">
				<div className="max-w-3xl mx-auto px-4 text-center">
					<p className="text-gray-500 text-sm">
						Found a bug? Click the{' '}
						<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs align-middle">
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
							</svg>
						</span>{' '}
						bubble in the bottom-right corner, then check the{' '}
						<a
							href={TRELLO_BOARD_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#0079BF] hover:underline underline-offset-2 font-medium"
						>
							Trello board
						</a>
						.
					</p>
				</div>
			</section>
		</div>
	)
}
