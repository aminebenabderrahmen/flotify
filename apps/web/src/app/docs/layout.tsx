'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
	BookOpen,
	Download,
	Rocket,
	Settings,
	Sliders,
	Code,
	Map,
	ArrowLeft,
	Menu,
	X,
} from 'lucide-react'

const navigation = [
	{ name: 'Getting Started', href: '/docs', icon: BookOpen },
	{ name: 'Installation', href: '/docs/installation', icon: Download },
	{ name: 'Quick Start', href: '/docs/quick-start', icon: Rocket },
	{
		name: 'Trello Setup Guide',
		href: '/docs/trello-setup',
		icon: Settings,
	},
	{ name: 'Configuration', href: '/docs/configuration', icon: Sliders },
	{ name: 'API Reference', href: '/docs/api-reference', icon: Code },
	{ name: 'Roadmap', href: '/docs/roadmap', icon: Map },
]

function NavLinks({
	pathname,
	onClick,
}: { pathname: string; onClick?: () => void }) {
	return (
		<>
			{navigation.map((item) => {
				const isActive =
					pathname === item.href ||
					(item.href !== '/docs' && pathname.startsWith(item.href))
				return (
					<Link
						key={item.href}
						href={item.href}
						onClick={onClick}
						className={cn(
							'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
							isActive
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-500 hover:text-gray-900 hover:bg-gray-50',
						)}
					>
						<item.icon className="h-4 w-4 shrink-0" />
						{item.name}
					</Link>
				)
			})}
		</>
	)
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<div className="min-h-screen">
			<header className="border-b border-gray-200 bg-white sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<div className="flex items-center gap-4">
						<button
							type="button"
							className="lg:hidden p-1 -ml-1 text-gray-500 hover:text-gray-900"
							onClick={() => setMobileOpen(!mobileOpen)}
						>
							{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
						<Link
							href="/"
							className="text-sm text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
						>
							<ArrowLeft className="h-3 w-3" />
							Home
						</Link>
						<span className="text-gray-200">/</span>
						<span className="text-sm font-semibold text-gray-900">Docs</span>
					</div>
					<a
						href="https://github.com/aminebenabderrahmen/flotify"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
					>
						GitHub
					</a>
				</div>

				{/* Mobile nav */}
				{mobileOpen && (
					<nav className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
						<NavLinks pathname={pathname} onClick={() => setMobileOpen(false)} />
					</nav>
				)}
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex gap-10 py-10">
					<aside className="hidden lg:block w-56 shrink-0">
						<nav className="sticky top-24 space-y-1">
							<NavLinks pathname={pathname} />
						</nav>
					</aside>

					<main className="flex-1 min-w-0 max-w-3xl">{children}</main>
				</div>
			</div>
		</div>
	)
}
