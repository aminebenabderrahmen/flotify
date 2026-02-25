import type { Feedback, FeedbackProvider, FlotifyConfig } from './types'
import { createBubble } from './ui/bubble'
import { createForm } from './ui/form'
import { injectStyles } from './ui/styles'
import { TrelloProvider } from '../providers/trello'

export class FlotifyWidget {
	private config: FlotifyConfig
	private provider: FeedbackProvider
	private bubble: HTMLButtonElement | null = null
	private formContainer: HTMLElement | null = null
	private isOpen = false

	constructor(config: FlotifyConfig) {
		if (!config.provider) {
			throw new Error('[Flotify] "provider" is required.')
		}
		if (config.provider === 'trello') {
			if (!config.trello?.apiKey || !config.trello?.token || !config.trello?.listId) {
				throw new Error('[Flotify] "trello.apiKey", "trello.token", and "trello.listId" are required.')
			}
		}

		this.config = {
			position: 'bottom-right',
			theme: 'light',
			accentColor: '#09090b',
			...config,
		}

		this.provider = this.createProvider()
	}

	private createProvider(): FeedbackProvider {
		switch (this.config.provider) {
			case 'trello':
				return new TrelloProvider(this.config.trello)
			default:
				throw new Error(`[Flotify] Unknown provider: ${this.config.provider}`)
		}
	}

	private resolveTheme(): 'light' | 'dark' {
		if (this.config.theme === 'auto') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		}
		return this.config.theme || 'light'
	}

	mount(): void {
		const theme = this.resolveTheme()
		injectStyles(this.config.accentColor!, theme)

		this.bubble = createBubble(this.config.position!, () => this.toggle())
		document.body.appendChild(this.bubble)
	}

	unmount(): void {
		this.close()
		this.bubble?.remove()
		this.bubble = null
		document.getElementById('flotify-styles')?.remove()
	}

	toggle(): void {
		if (this.isOpen) {
			this.close()
		} else {
			this.open()
		}
	}

	open(): void {
		if (this.isOpen) return
		this.isOpen = true

		this.formContainer = createForm({
			position: this.config.position!,
			onSubmit: async (feedback: Feedback) => {
				const result = await this.provider.submit(feedback)
				if (!result.success) {
					throw new Error(result.error)
				}
			},
			onClose: () => this.close(),
		})

		document.body.appendChild(this.formContainer)
	}

	close(): void {
		if (!this.isOpen) return
		this.isOpen = false
		if (this.formContainer) {
			(this.formContainer as HTMLElement & { destroy?: () => void }).destroy?.()
			this.formContainer.remove()
			this.formContainer = null
		}
	}
}
