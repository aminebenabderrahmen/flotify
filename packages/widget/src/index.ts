import type { FlotifyConfig } from './core/types'
import { FlotifyWidget } from './core/flotify'

export type { FlotifyConfig, Feedback, FeedbackType, Priority, FeedbackProvider } from './core/types'

let instance: FlotifyWidget | null = null

export const Flotify = {
	init(config: FlotifyConfig): FlotifyWidget {
		if (instance) {
			instance.unmount()
		}

		instance = new FlotifyWidget(config)
		instance.mount()

		return instance
	},

	destroy(): void {
		instance?.unmount()
		instance = null
	},

	open(): void {
		instance?.open()
	},

	close(): void {
		instance?.close()
	},

	toggle(): void {
		instance?.toggle()
	},
}

// Auto-init from script tag data attributes
if (typeof window !== 'undefined') {
	const script = document.currentScript as HTMLScriptElement | null
	if (script?.dataset.autoInit !== undefined) {
		const apiKey = script.dataset.trelloApiKey
		const token = script.dataset.trelloToken
		const listId = script.dataset.trelloListId

		if (apiKey && token && listId) {
			document.addEventListener('DOMContentLoaded', () => {
				Flotify.init({
					provider: 'trello',
					trello: { apiKey, token, listId },
					position: (script.dataset.position as 'bottom-right' | 'bottom-left') || 'bottom-right',
					theme: (script.dataset.theme as 'light' | 'dark' | 'auto') || 'light',
				})
			})
		}
	}

	// Expose globally for script tag usage
	;(window as any).Flotify = Flotify
}

export default Flotify
