import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-900">404</h1>
				<p className="mt-3 text-lg text-gray-500">Page not found.</p>
				<Link
					href="/"
					className="mt-6 inline-block px-5 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
				>
					Back to home
				</Link>
			</div>
		</div>
	)
}
