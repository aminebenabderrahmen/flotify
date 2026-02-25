import { LogoIcon } from '@/components/logo'

export function Footer() {
	const links = [
		{ name: 'Docs', url: '/docs' },
		{ name: 'GitHub', url: 'https://github.com/aminebenabderrahmen/flotify' },
		{ name: 'npm', url: 'https://www.npmjs.com/package/@flotify/widget' },
	]

	return (
		<footer className="border-t border-gray-200 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
				<div className="flex items-center gap-2">
					<LogoIcon className="h-5 w-5" />
					<p className="text-sm text-gray-400">
						MIT License &middot; Flotify {new Date().getFullYear()}
					</p>
				</div>
				<div className="flex space-x-6">
					{links.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target={link.url.startsWith('http') ? '_blank' : undefined}
							rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
							className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200"
						>
							{link.name}
						</a>
					))}
				</div>
			</div>
		</footer>
	)
}
