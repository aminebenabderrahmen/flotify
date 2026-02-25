import { H1, H2, P, Subtitle, CodeBlock, Step, Callout, PackageInstall } from '@/components/docs-prose'

export default function QuickStartPage() {
	return (
		<div>
			<H1>Quick Start</H1>
			<Subtitle>Get the Flotify widget running on your site in under 2 minutes.</Subtitle>

			<Step number={1} title="Install the package">
				<PackageInstall pkg="@flotify/widget" />
			</Step>

			<Step number={2} title="Get your Trello credentials">
				<P>
					You need three things from Trello: an API key, a token, and a list ID.
					See the full <a href="/docs/trello-setup" className="text-gray-900 underline underline-offset-2">Trello Setup Guide</a> for
					a detailed walkthrough.
				</P>
			</Step>

			<Step number={3} title="Initialize the widget">
				<CodeBlock title="main.ts">{`import { Flotify } from '@flotify/widget'

Flotify.init({
  provider: 'trello',
  trello: {
    apiKey: 'your-api-key',
    token: 'your-token',
    listId: 'your-list-id',
  },
})`}</CodeBlock>
			</Step>

			<Callout type="tip">
				That&apos;s it. A feedback bubble will appear in the bottom-right corner of your page.
				When users submit feedback, a card is created on your Trello board with the title,
				description, type, priority, screenshot, and browser metadata.
			</Callout>

			<H2 id="frameworks">Framework Examples</H2>

			<P>Flotify is framework-agnostic. Here&apos;s how to use it with popular frameworks:</P>

			<CodeBlock title="React (useEffect)">{`import { useEffect } from 'react'
import { Flotify } from '@flotify/widget'

export default function App() {
  useEffect(() => {
    const widget = Flotify.init({
      provider: 'trello',
      trello: {
        apiKey: process.env.NEXT_PUBLIC_TRELLO_API_KEY!,
        token: process.env.NEXT_PUBLIC_TRELLO_TOKEN!,
        listId: process.env.NEXT_PUBLIC_TRELLO_LIST_ID!,
      },
    })

    return () => Flotify.destroy()
  }, [])

  return <div>Your app</div>
}`}</CodeBlock>

			<CodeBlock title="Vue (onMounted)">{`<script setup>
import { onMounted, onUnmounted } from 'vue'
import { Flotify } from '@flotify/widget'

onMounted(() => {
  Flotify.init({
    provider: 'trello',
    trello: {
      apiKey: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      listId: import.meta.env.VITE_TRELLO_LIST_ID,
    },
  })
})

onUnmounted(() => Flotify.destroy())
</script>`}</CodeBlock>

			<CodeBlock title="Plain HTML">{`<script src="https://cdn.jsdelivr.net/npm/@flotify/widget/dist/index.js"></script>
<script>
  Flotify.init({
    provider: 'trello',
    trello: {
      apiKey: 'your-api-key',
      token: 'your-token',
      listId: 'your-list-id',
    },
  })
</script>`}</CodeBlock>
		</div>
	)
}
