'use client'

import { useState } from 'react'

export function DocsProse({ children }: { children: React.ReactNode }) {
	return <div className="docs-prose">{children}</div>
}

export function H1({ children }: { children: React.ReactNode }) {
	return <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{children}</h1>
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
	return (
		<h2 id={id} className="text-xl font-semibold text-gray-900 mt-10 mb-4 scroll-mt-24">
			{children}
		</h2>
	)
}

export function H3({ children }: { children: React.ReactNode }) {
	return <h3 className="text-lg font-medium text-gray-900 mt-8 mb-3">{children}</h3>
}

export function P({ children }: { children: React.ReactNode }) {
	return <p className="text-base text-gray-600 leading-7 mb-4">{children}</p>
}

export function Subtitle({ children }: { children: React.ReactNode }) {
	return <p className="text-lg text-gray-500 mb-8">{children}</p>
}

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)

	return (
		<button
			type="button"
			className="absolute top-2.5 right-2.5 px-2 py-1 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors cursor-pointer"
			onClick={() => {
				navigator.clipboard.writeText(text)
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			}}
		>
			{copied ? 'Copied!' : 'Copy'}
		</button>
	)
}

export function CodeBlock({
	children,
	title,
}: {
	children: string
	title?: string
}) {
	return (
		<div className="my-4 rounded-lg overflow-hidden bg-gray-900 relative group">
			{title && (
				<div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-800 pr-16">
					{title}
				</div>
			)}
			<div className="relative">
				<CopyButton text={children} />
				<pre className="p-4 overflow-x-auto pr-16">
					<code className="text-sm text-gray-300 font-mono leading-relaxed">{children}</code>
				</pre>
			</div>
		</div>
	)
}

const managers = [
	{ name: 'npm', command: 'npm install' },
	{ name: 'pnpm', command: 'pnpm add' },
	{ name: 'yarn', command: 'yarn add' },
	{ name: 'bun', command: 'bun add' },
] as const

export function PackageInstall({ pkg }: { pkg: string }) {
	const [active, setActive] = useState(0)
	const command = `${managers[active].command} ${pkg}`

	return (
		<div className="my-4 rounded-lg overflow-hidden bg-gray-900">
			<div className="flex items-center justify-between border-b border-gray-800">
				<div className="flex">
					{managers.map((m, i) => (
						<button
							key={m.name}
							type="button"
							className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
								i === active
									? 'text-white bg-gray-800'
									: 'text-gray-500 hover:text-gray-300'
							}`}
							onClick={() => setActive(i)}
						>
							{m.name}
						</button>
					))}
				</div>
			</div>
			<div className="relative">
				<CopyButton text={command} />
				<pre className="p-4 overflow-x-auto pr-16">
					<code className="text-sm text-gray-300 font-mono">{command}</code>
				</pre>
			</div>
		</div>
	)
}

export function InlineCode({ children }: { children: React.ReactNode }) {
	return (
		<code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
			{children}
		</code>
	)
}

export function Callout({
	type = 'info',
	children,
}: {
	type?: 'info' | 'warning' | 'tip'
	children: React.ReactNode
}) {
	const styles = {
		info: 'bg-blue-50 border-blue-200 text-blue-800',
		warning: 'bg-amber-50 border-amber-200 text-amber-800',
		tip: 'bg-green-50 border-green-200 text-green-800',
	}
	const icons = {
		info: 'i',
		warning: '!',
		tip: '*',
	}

	return (
		<div className={`my-4 px-4 py-3 rounded-lg border text-sm leading-6 ${styles[type]}`}>
			<span className="font-semibold mr-2">{icons[type]}</span>
			{children}
		</div>
	)
}

export function Step({
	number,
	title,
	children,
}: {
	number: number
	title: string
	children: React.ReactNode
}) {
	return (
		<div className="flex gap-4 mb-8">
			<div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-900 text-white text-sm font-bold shrink-0 mt-0.5">
				{number}
			</div>
			<div className="flex-1 min-w-0">
				<h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
				<div className="text-gray-600 text-sm leading-6">{children}</div>
			</div>
		</div>
	)
}
