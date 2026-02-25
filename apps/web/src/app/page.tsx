import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { CodeSnippet } from '@/components/code-snippet'
import { Features } from '@/components/features'
import { LiveDemo } from '@/components/live-demo'
import { Integrations } from '@/components/integrations'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
	return (
		<main>
			<Header />
			<Hero />
			<CodeSnippet />
			<Features />
			<LiveDemo />
			<Integrations />
			<CTA />
			<Footer />
		</main>
	)
}
