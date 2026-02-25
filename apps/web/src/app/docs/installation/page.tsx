import { H1, H2, P, Subtitle, CodeBlock, Callout, InlineCode, PackageInstall } from '@/components/docs-prose'

export default function InstallationPage() {
	return (
		<div>
			<H1>Installation</H1>
			<Subtitle>Install Flotify in your project using your preferred package manager.</Subtitle>

			<H2 id="package-manager">Package Manager</H2>
			<PackageInstall pkg="@flotify/widget" />

			<H2 id="cdn">CDN (Script Tag)</H2>
			<P>
				If you&apos;re not using a bundler, you can include Flotify directly via a script tag.
				This is the fastest way to get started with plain HTML.
			</P>
			<CodeBlock title="index.html">{`<script
  src="https://cdn.jsdelivr.net/npm/@flotify/widget/dist/index.js"
  data-auto-init
  data-trello-api-key="your-api-key"
  data-trello-token="your-token"
  data-trello-list-id="your-list-id"
></script>`}</CodeBlock>

			<Callout type="tip">
				With the CDN approach, the widget automatically initializes using the{' '}
				<InlineCode>data-*</InlineCode> attributes. No JavaScript needed.
			</Callout>

			<H2 id="requirements">Requirements</H2>
			<P>
				Flotify has <strong>zero dependencies</strong>. It works in any modern browser
				(Chrome, Firefox, Safari, Edge). The only external resource loaded is{' '}
				<InlineCode>html2canvas</InlineCode> for the auto-screenshot feature, and it&apos;s
				lazy-loaded only when the user opens the feedback form.
			</P>
		</div>
	)
}
