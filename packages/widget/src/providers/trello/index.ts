import type { Feedback, SubmitResult, TrelloConfig } from '../../core/types'
import { BaseProvider } from '../base'
import { createCard } from './api'

const TYPE_LABELS: Record<string, string> = {
	bug: '🐛 Bug',
	feature: '✨ Feature',
	question: '❓ Question',
}

const PRIORITY_EMOJI: Record<string, string> = {
	low: '🟢',
	medium: '🟡',
	high: '🔴',
}

function buildDescription(feedback: Feedback): string {
	const sections: string[] = []

	if (feedback.description) {
		sections.push(feedback.description)
	}

	sections.push('---')
	sections.push(`**Type:** ${TYPE_LABELS[feedback.type]}`)
	sections.push(`**Priority:** ${PRIORITY_EMOJI[feedback.priority]} ${feedback.priority}`)
	sections.push('')
	sections.push('**Metadata**')
	sections.push(`- **URL:** ${feedback.metadata.url}`)
	sections.push(`- **Browser:** ${feedback.metadata.userAgent}`)
	sections.push(`- **Screen:** ${feedback.metadata.screenSize}`)
	sections.push(`- **Time:** ${feedback.metadata.timestamp}`)
	sections.push('')
	sections.push('*Sent via [Flotify](https://flotify.dev)*')

	return sections.join('\n')
}

export class TrelloProvider extends BaseProvider {
	name = 'trello'
	private config: TrelloConfig

	constructor(config: TrelloConfig) {
		super()
		this.config = config
	}

	async submit(feedback: Feedback): Promise<SubmitResult> {
		try {
			const card = await createCard(
				this.config,
				{
					name: `[${TYPE_LABELS[feedback.type]}] ${feedback.title}`,
					desc: buildDescription(feedback),
					idList: this.config.listId,
				},
				feedback.screenshot,
			)

			return { success: true, url: card.url }
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			return { success: false, error: message }
		}
	}
}
