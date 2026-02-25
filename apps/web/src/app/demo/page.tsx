import type { Metadata } from 'next'
import { DemoClient } from './demo-client'

export const metadata: Metadata = {
	title: 'Live Demo — Flotify',
	description:
		'Try Flotify live. Report bugs on this page and see them appear on our public Trello board in real time.',
}

export default function DemoPage() {
	return <DemoClient />
}
