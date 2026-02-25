import { H1, H2, P, Subtitle, CodeBlock, InlineCode } from '@/components/docs-prose'

export default function ApiReferencePage() {
	return (
		<div>
			<H1>API Reference</H1>
			<Subtitle>Complete reference for the Flotify JavaScript API.</Subtitle>

			<H2 id="init">Flotify.init(config)</H2>
			<P>
				Initialize the widget and mount it to the page. Returns the widget instance.
			</P>
			<CodeBlock>{`const widget = Flotify.init({
  provider: 'trello',
  trello: { apiKey, token, listId },
  position: 'bottom-right',
  theme: 'light',
  accentColor: '#09090b',
})`}</CodeBlock>
			<P>
				If called multiple times, the previous widget is destroyed before creating a new one.
			</P>

			<H2 id="destroy">Flotify.destroy()</H2>
			<P>
				Remove the widget from the page and clean up all event listeners.
			</P>
			<CodeBlock>{`Flotify.destroy()`}</CodeBlock>
			<P>
				Call this in your component&apos;s cleanup function (e.g., React&apos;s <InlineCode>useEffect</InlineCode> return
				or Vue&apos;s <InlineCode>onUnmounted</InlineCode>).
			</P>

			<H2 id="open">Flotify.open()</H2>
			<P>
				Programmatically open the feedback form. Useful for triggering the widget from
				a custom button.
			</P>
			<CodeBlock>{`// Custom feedback button
document.getElementById('my-btn').addEventListener('click', () => {
  Flotify.open()
})`}</CodeBlock>

			<H2 id="close">Flotify.close()</H2>
			<P>
				Programmatically close the feedback form.
			</P>
			<CodeBlock>{`Flotify.close()`}</CodeBlock>

			<H2 id="toggle">Flotify.toggle()</H2>
			<P>
				Toggle the feedback form open/closed.
			</P>
			<CodeBlock>{`Flotify.toggle()`}</CodeBlock>

			<H2 id="types">TypeScript Types</H2>

			<CodeBlock title="Types">{`import type {
  FlotifyConfig,
  Feedback,
  FeedbackType,
  Priority,
  FeedbackProvider,
} from '@flotify/widget'

// FeedbackType = 'bug' | 'feature' | 'question'
// Priority = 'low' | 'medium' | 'high'

// Feedback shape:
interface Feedback {
  type: FeedbackType
  title: string
  description?: string
  priority: Priority
  screenshot?: Blob
  metadata: {
    url: string
    userAgent: string
    screenSize: string
    timestamp: string
  }
}

// Provider interface (for custom integrations):
interface FeedbackProvider {
  name: string
  submit(feedback: Feedback): Promise<{
    success: boolean
    url?: string
    error?: string
  }>
}`}</CodeBlock>

			<H2 id="trello-card">Trello Card Format</H2>
			<P>
				When a user submits feedback, Flotify creates a Trello card with this structure:
			</P>

			<CodeBlock>{`Title: [🐛 Bug] Button not working on mobile

Description:
The submit button doesn't respond to taps on iOS Safari.
---
**Type:** 🐛 Bug
**Priority:** 🔴 high

**Metadata**
- **URL:** https://example.com/checkout
- **Browser:** Mozilla/5.0 (iPhone; CPU iPhone OS 17_0...)
- **Screen:** 390x844
- **Time:** 2026-02-25T14:30:00.000Z

*Sent via Flotify*

Attachment: screenshot.png (set as card cover)`}</CodeBlock>
		</div>
	)
}
