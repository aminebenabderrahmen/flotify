import { H1, H2, P, Subtitle, CodeBlock, InlineCode, Callout } from '@/components/docs-prose'

export default function ConfigurationPage() {
	return (
		<div>
			<H1>Configuration</H1>
			<Subtitle>All available options to customize the Flotify widget.</Subtitle>

			<CodeBlock title="Full configuration example">{`import { Flotify } from '@flotify/widget'

Flotify.init({
  // Required: which provider to use
  provider: 'trello',

  // Required: Trello credentials
  trello: {
    apiKey: 'your-api-key',
    token: 'your-token',
    listId: 'your-list-id',
  },

  // Optional: widget position (default: 'bottom-right')
  position: 'bottom-right', // or 'bottom-left'

  // Optional: color theme (default: 'light')
  theme: 'light', // 'light' | 'dark' | 'auto'

  // Optional: accent color for the bubble and buttons (default: '#09090b')
  accentColor: '#09090b',
})`}</CodeBlock>

			<H2 id="options">Options Reference</H2>

			<div className="my-6 overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="text-left py-3 pr-4 font-semibold text-gray-900">Option</th>
							<th className="text-left py-3 pr-4 font-semibold text-gray-900">Type</th>
							<th className="text-left py-3 pr-4 font-semibold text-gray-900">Default</th>
							<th className="text-left py-3 font-semibold text-gray-900">Description</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						<tr>
							<td className="py-3 pr-4"><InlineCode>provider</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>&apos;trello&apos;</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500">—</td>
							<td className="py-3 text-gray-600">Required. The integration provider.</td>
						</tr>
						<tr>
							<td className="py-3 pr-4"><InlineCode>trello.apiKey</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>string</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500">—</td>
							<td className="py-3 text-gray-600">Required. Your Trello API key.</td>
						</tr>
						<tr>
							<td className="py-3 pr-4"><InlineCode>trello.token</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>string</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500">—</td>
							<td className="py-3 text-gray-600">Required. Your Trello authorization token.</td>
						</tr>
						<tr>
							<td className="py-3 pr-4"><InlineCode>trello.listId</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>string</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500">—</td>
							<td className="py-3 text-gray-600">Required. The ID of the Trello list where cards will be created.</td>
						</tr>
						<tr>
							<td className="py-3 pr-4"><InlineCode>position</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>string</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>&apos;bottom-right&apos;</InlineCode></td>
							<td className="py-3 text-gray-600">Widget bubble position. <InlineCode>&apos;bottom-right&apos;</InlineCode> or <InlineCode>&apos;bottom-left&apos;</InlineCode>.</td>
						</tr>
						<tr>
							<td className="py-3 pr-4"><InlineCode>theme</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>string</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>&apos;light&apos;</InlineCode></td>
							<td className="py-3 text-gray-600"><InlineCode>&apos;light&apos;</InlineCode>, <InlineCode>&apos;dark&apos;</InlineCode>, or <InlineCode>&apos;auto&apos;</InlineCode> (follows system preference).</td>
						</tr>
						<tr>
							<td className="py-3 pr-4"><InlineCode>accentColor</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>string</InlineCode></td>
							<td className="py-3 pr-4 text-gray-500"><InlineCode>&apos;#09090b&apos;</InlineCode></td>
							<td className="py-3 text-gray-600">Hex color for the bubble and primary buttons.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<H2 id="theme">Theming</H2>

			<P>
				The widget adapts to light and dark mode. Set <InlineCode>theme: &apos;auto&apos;</InlineCode> to
				follow the user&apos;s system preference, or force a specific theme.
			</P>

			<CodeBlock>{`// Follow system preference
Flotify.init({ theme: 'auto', ... })

// Force dark mode
Flotify.init({ theme: 'dark', ... })

// Custom accent color (e.g., your brand color)
Flotify.init({ accentColor: '#0079BF', ... })`}</CodeBlock>

			<H2 id="env">Environment Variables</H2>

			<P>
				We recommend storing your Trello credentials in environment variables instead of
				hardcoding them.
			</P>

			<CodeBlock title=".env.local">{`NEXT_PUBLIC_TRELLO_API_KEY=your-api-key
NEXT_PUBLIC_TRELLO_TOKEN=your-token
NEXT_PUBLIC_TRELLO_LIST_ID=your-list-id`}</CodeBlock>

			<CodeBlock title="main.ts">{`Flotify.init({
  provider: 'trello',
  trello: {
    apiKey: process.env.NEXT_PUBLIC_TRELLO_API_KEY!,
    token: process.env.NEXT_PUBLIC_TRELLO_TOKEN!,
    listId: process.env.NEXT_PUBLIC_TRELLO_LIST_ID!,
  },
})`}</CodeBlock>

			<Callout type="warning">
				Even with environment variables, the values are embedded in the client-side bundle
				at build time. They are not secret. Only use Trello boards where the data is not
				sensitive.
			</Callout>
		</div>
	)
}
