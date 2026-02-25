import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoIcon } from '@/components/logo'

export function Header() {
	return (
		<header className="border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
				<Link href="/" className="flex items-center gap-2">
					<LogoIcon />
					<span className="text-xl font-bold text-gray-900">Flotify</span>
				</Link>
				<div className="flex items-center space-x-4">
					<Link
						href="/demo"
						className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
					>
						Demo
					</Link>
					<Link
						href="/docs"
						className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
					>
						Docs
					</Link>
					<a
						href="https://github.com/aminebenabderrahmen/flotify"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button variant="outline" size="sm">
							<Github className="h-4 w-4" />
							GitHub
						</Button>
					</a>
				</div>
			</div>
		</header>
	)
}
