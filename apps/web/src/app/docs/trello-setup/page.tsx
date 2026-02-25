import {
	H1,
	H2,
	H3,
	P,
	Subtitle,
	CodeBlock,
	Step,
	Callout,
	InlineCode,
} from '@/components/docs-prose'

export default function TrelloSetupPage() {
	return (
		<div>
			<H1>Trello Setup Guide</H1>
			<Subtitle>
				Complete walkthrough to connect Flotify to your Trello board. Takes about 5 minutes.
			</Subtitle>

			<Callout type="info">
				You need a free Trello account. If you don&apos;t have one, create it at{' '}
				<a
					href="https://trello.com/signup"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2"
				>
					trello.com/signup
				</a>
				.
			</Callout>

			<H2 id="api-key">1. Get your API Key</H2>

			<Step number={1} title="Go to the Trello Power-Up Admin">
				<P>
					Open{' '}
					<a
						href="https://trello.com/power-ups/admin"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-900 underline underline-offset-2"
					>
						trello.com/power-ups/admin
					</a>{' '}
					and sign in with your Trello account.
				</P>
			</Step>

			<Step number={2} title='Click "New" to create a Power-Up'>
				<P>
					Fill in the form:
				</P>
				<ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
					<li>
						<strong>Name:</strong> <InlineCode>Flotify Feedback</InlineCode> (or any name you like)
					</li>
					<li>
						<strong>Workspace:</strong> Select the workspace that contains your target board
					</li>
					<li>
						<strong>Iframe connector URL:</strong> Leave empty
					</li>
					<li>
						<strong>Email:</strong> Your email
					</li>
					<li>
						<strong>Author:</strong> Your name
					</li>
				</ul>
			</Step>

			<Step number={3} title="Copy your API Key">
				<P>
					After creating the Power-Up, you&apos;ll see your <strong>API Key</strong> on
					the left sidebar under &quot;API Key&quot;. Copy it and save it somewhere safe.
				</P>
				<CodeBlock>{`TRELLO_API_KEY=your-api-key-here`}</CodeBlock>
			</Step>

			<H2 id="token">2. Generate a Token</H2>

			<Step number={4} title="Generate an authorization token">
				<P>
					On the same Power-Up page, next to your API Key, click the link{' '}
					<strong>&quot;Token&quot;</strong> (or you can generate one manually).
				</P>
				<P>
					Replace <InlineCode>YOUR_API_KEY</InlineCode> in the URL below and open it in your browser:
				</P>
				<CodeBlock>{`https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key=YOUR_API_KEY`}</CodeBlock>
				<P>
					Click <strong>&quot;Allow&quot;</strong>. Trello will display your token. Copy it.
				</P>
				<CodeBlock>{`TRELLO_TOKEN=your-token-here`}</CodeBlock>
			</Step>

			<Callout type="warning">
				This token gives read and write access to your Trello account. Keep it secret.
				Since Flotify runs client-side, this token will be visible in your page source.
				Only use it on boards where the data is not sensitive.
			</Callout>

			<H2 id="list-id">3. Find your List ID</H2>

			<Step number={5} title="Open your target board">
				<P>
					Navigate to the Trello board where you want feedback cards to land.
					Create a new list called <InlineCode>Inbox</InlineCode> (or use an existing one).
				</P>
			</Step>

			<Step number={6} title="Get the List ID from the API">
				<P>
					The easiest way to find your list ID is to open this URL in your browser
					(replace the values with yours):
				</P>
				<CodeBlock>{`https://api.trello.com/1/boards/YOUR_BOARD_ID/lists?key=YOUR_API_KEY&token=YOUR_TOKEN`}</CodeBlock>
				<P>
					To find your <strong>Board ID</strong>: open your board in Trello, add{' '}
					<InlineCode>.json</InlineCode> at the end of the URL, and look for the{' '}
					<InlineCode>&quot;id&quot;</InlineCode> field at the top of the JSON.
				</P>
				<P>
					The API will return an array of lists. Find the one named &quot;Inbox&quot; and copy
					its <InlineCode>id</InlineCode>.
				</P>
				<CodeBlock>{`// Response example:
[
  {
    "id": "60d5f4b8c3a4e12a3f8b4567",  // <-- This is your List ID
    "name": "Inbox",
    ...
  },
  {
    "id": "60d5f4b8c3a4e12a3f8b4568",
    "name": "In Progress",
    ...
  }
]`}</CodeBlock>
				<CodeBlock>{`TRELLO_LIST_ID=60d5f4b8c3a4e12a3f8b4567`}</CodeBlock>
			</Step>

			<H2 id="test">4. Test the connection</H2>

			<Step number={7} title="Initialize Flotify and test">
				<P>
					Now that you have all three values, initialize the widget:
				</P>
				<CodeBlock title="main.ts">{`import { Flotify } from '@flotify/widget'

Flotify.init({
  provider: 'trello',
  trello: {
    apiKey: 'your-api-key',
    token: 'your-token',
    listId: 'your-list-id',
  },
})

// Submit a test feedback
Flotify.open()`}</CodeBlock>
				<P>
					Click the bubble, fill in a test feedback, and submit. Check your Trello board — a
					new card should appear in your Inbox list within seconds.
				</P>
			</Step>

			<H2 id="watch">5. Enable notifications (recommended)</H2>

			<Step number={8} title='Watch your feedback list'>
				<P>
					To get notified when new feedback arrives:
				</P>
				<ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
					<li>
						Open your Trello board and find the <strong>Inbox</strong> list
					</li>
					<li>
						Click the <strong>&quot;...&quot;</strong> menu on the list header
					</li>
					<li>
						Click <strong>&quot;Watch&quot;</strong>
					</li>
				</ul>
				<P>
					You&apos;ll now receive Trello notifications (email + mobile push) every time a user
					submits feedback. This is the fastest way to stay on top of incoming reports.
				</P>
			</Step>

			<Callout type="tip">
				Also enable notifications in the Trello mobile app for real-time alerts on your phone.
			</Callout>

			<H2 id="board-structure">6. Recommended board structure</H2>

			<P>
				We recommend organizing your feedback board with these lists:
			</P>

			<div className="my-4 grid grid-cols-4 gap-2">
				{['Inbox', 'Under Review', 'In Progress', 'Done'].map((name, i) => (
					<div
						key={name}
						className={`p-3 rounded-lg border text-center text-sm font-medium ${
							i === 0
								? 'bg-gray-900 text-white border-gray-900'
								: 'bg-white text-gray-600 border-gray-200'
						}`}
					>
						{name}
						{i === 0 && (
							<span className="block text-xs font-normal text-gray-400 mt-1">
								Feedback lands here
							</span>
						)}
					</div>
				))}
			</div>

			<P>
				When new feedback comes in, it lands in <strong>Inbox</strong>. You triage it, move it
				to <strong>Under Review</strong>, then to <strong>In Progress</strong> when a developer
				picks it up, and finally to <strong>Done</strong> when resolved.
			</P>

			<H2 id="troubleshooting">7. Troubleshooting</H2>

			<H3>Card not appearing on the board</H3>
			<ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
				<li>Double-check your API key, token, and list ID</li>
				<li>Make sure the token has <InlineCode>read,write</InlineCode> scope</li>
				<li>Check the browser console for error messages</li>
				<li>Verify the list still exists (wasn&apos;t archived or deleted)</li>
			</ul>

			<H3>&quot;Invalid token&quot; error</H3>
			<ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
				<li>Regenerate your token using the URL in step 4</li>
				<li>Make sure the token was generated with the same API key</li>
			</ul>

			<H3>&quot;Unauthorized&quot; error</H3>
			<ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
				<li>Your API key may be revoked — regenerate it from the Power-Up admin</li>
				<li>
					Make sure the Power-Up is associated with the correct workspace
				</li>
			</ul>
		</div>
	)
}
