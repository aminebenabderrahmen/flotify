import type { TrelloConfig } from '../../core/types'

const TRELLO_API_BASE = 'https://api.trello.com/1'

export async function createCard(
	config: TrelloConfig,
	params: {
		name: string
		desc: string
		idList: string
		idLabels?: string[]
	},
	attachment?: Blob,
): Promise<{ id: string; url: string }> {
	const url = new URL(`${TRELLO_API_BASE}/cards`)
	url.searchParams.set('key', config.apiKey)
	url.searchParams.set('token', config.token)

	const response = await fetch(url.toString(), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: params.name,
			desc: params.desc,
			idList: params.idList,
			idLabels: params.idLabels,
			pos: 'top',
		}),
	})

	if (!response.ok) {
		const text = await response.text()
		throw new Error(`Trello API error (${response.status}): ${text}`)
	}

	const card = await response.json()

	if (attachment) {
		await addAttachment(config, card.id, attachment)
	}

	return { id: card.id, url: card.url }
}

async function addAttachment(
	config: TrelloConfig,
	cardId: string,
	file: Blob,
): Promise<void> {
	const url = new URL(`${TRELLO_API_BASE}/cards/${cardId}/attachments`)
	url.searchParams.set('key', config.apiKey)
	url.searchParams.set('token', config.token)

	const formData = new FormData()
	formData.append('file', file, 'screenshot.png')
	formData.append('name', 'Screenshot')
	formData.append('setCover', 'true')

	const response = await fetch(url.toString(), {
		method: 'POST',
		body: formData,
	})

	if (!response.ok) {
		console.warn('[Flotify] Failed to attach screenshot to card')
	}
}
