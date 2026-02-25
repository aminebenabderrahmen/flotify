export type FeedbackType = 'bug' | 'feature' | 'question'

export type Priority = 'low' | 'medium' | 'high'

export interface Feedback {
	type: FeedbackType
	title: string
	description?: string
	priority: Priority
	screenshot?: Blob
	metadata: FeedbackMetadata
}

export interface FeedbackMetadata {
	url: string
	userAgent: string
	screenSize: string
	timestamp: string
}

export interface SubmitResult {
	success: boolean
	url?: string
	error?: string
}

export interface FeedbackProvider {
	name: string
	submit(feedback: Feedback): Promise<SubmitResult>
}

export interface TrelloConfig {
	apiKey: string
	token: string
	listId: string
}

export interface FlotifyConfig {
	provider: 'trello'
	trello: TrelloConfig
	position?: 'bottom-right' | 'bottom-left'
	theme?: 'light' | 'dark' | 'auto'
	accentColor?: string
	locale?: 'en' | 'fr'
	onSubmitSuccess?: () => void
}
