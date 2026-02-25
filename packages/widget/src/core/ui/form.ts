import type { Feedback, FeedbackType, Priority } from '../types'
import { ICONS } from './icons'
import { captureScreenshot, createDropZone } from './screenshot'

interface FormOptions {
	position: 'bottom-right' | 'bottom-left'
	onSubmit: (feedback: Feedback) => Promise<void>
	onClose: () => void
}

function collectMetadata() {
	return {
		url: window.location.href,
		userAgent: navigator.userAgent,
		screenSize: `${window.innerWidth}x${window.innerHeight}`,
		timestamp: new Date().toISOString(),
	}
}

export function createForm(options: FormOptions): HTMLElement & { destroy: () => void } {
	const { position, onSubmit, onClose } = options

	let selectedType: FeedbackType = 'bug'
	let selectedPriority: Priority = 'medium'
	let screenshotBlob: Blob | null = null
	let screenshotUrl: string | null = null
	let successTimer: ReturnType<typeof setTimeout> | null = null
	let isSubmitting = false

	// Overlay
	const overlay = document.createElement('div')
	overlay.className = 'flotify-overlay'
	overlay.addEventListener('click', onClose)

	// Modal
	const modal = document.createElement('div')
	modal.className = 'flotify-modal'
	modal.style.bottom = '80px'
	if (position === 'bottom-right') {
		modal.style.right = '20px'
	} else {
		modal.style.left = '20px'
	}

	// --- Header ---
	const header = document.createElement('div')
	header.className = 'flotify-modal-header'

	const title = document.createElement('h3')
	title.className = 'flotify-modal-title'
	title.textContent = 'Report feedback'

	const closeBtn = document.createElement('button')
	closeBtn.className = 'flotify-modal-close'
	closeBtn.innerHTML = ICONS.close
	closeBtn.addEventListener('click', onClose)

	header.appendChild(title)
	header.appendChild(closeBtn)

	// --- Body ---
	const body = document.createElement('div')
	body.className = 'flotify-modal-body'

	// Type selector
	const typeField = document.createElement('div')
	typeField.className = 'flotify-field'
	const typeLabel = document.createElement('label')
	typeLabel.className = 'flotify-label'
	typeLabel.textContent = 'Type'
	const typeGroup = document.createElement('div')
	typeGroup.className = 'flotify-type-group'

	const types: { value: FeedbackType; label: string; icon: string }[] = [
		{ value: 'bug', label: 'Bug', icon: ICONS.bug },
		{ value: 'feature', label: 'Feature', icon: ICONS.feature },
		{ value: 'question', label: 'Question', icon: ICONS.question },
	]

	const typeButtons: HTMLButtonElement[] = []
	for (const t of types) {
		const btn = document.createElement('button')
		btn.className = 'flotify-type-btn'
		btn.type = 'button'
		btn.textContent = `${t.icon} ${t.label}`
		btn.dataset.active = String(t.value === selectedType)
		btn.addEventListener('click', () => {
			selectedType = t.value
			for (const b of typeButtons) b.dataset.active = 'false'
			btn.dataset.active = 'true'
		})
		typeButtons.push(btn)
		typeGroup.appendChild(btn)
	}
	typeField.appendChild(typeLabel)
	typeField.appendChild(typeGroup)

	// Priority selector
	const priorityField = document.createElement('div')
	priorityField.className = 'flotify-field'
	const priorityLabel = document.createElement('label')
	priorityLabel.className = 'flotify-label'
	priorityLabel.textContent = 'Priority'
	const prioritySelect = document.createElement('select')
	prioritySelect.className = 'flotify-select'
	for (const p of ['low', 'medium', 'high'] as Priority[]) {
		const opt = document.createElement('option')
		opt.value = p
		opt.textContent = p.charAt(0).toUpperCase() + p.slice(1)
		if (p === 'medium') opt.selected = true
		prioritySelect.appendChild(opt)
	}
	prioritySelect.addEventListener('change', () => {
		selectedPriority = prioritySelect.value as Priority
	})
	priorityField.appendChild(priorityLabel)
	priorityField.appendChild(prioritySelect)

	// Title input
	const titleField = document.createElement('div')
	titleField.className = 'flotify-field'
	const titleLabel = document.createElement('label')
	titleLabel.className = 'flotify-label flotify-label-required'
	titleLabel.textContent = 'Title'
	const titleInput = document.createElement('input')
	titleInput.className = 'flotify-input'
	titleInput.type = 'text'
	titleInput.placeholder = "What's the issue?"
	titleInput.required = true
	titleField.appendChild(titleLabel)
	titleField.appendChild(titleInput)

	// Description textarea
	const descField = document.createElement('div')
	descField.className = 'flotify-field'
	const descLabel = document.createElement('label')
	descLabel.className = 'flotify-label'
	descLabel.textContent = 'Description'
	const descTextarea = document.createElement('textarea')
	descTextarea.className = 'flotify-textarea'
	descTextarea.placeholder = 'Describe the issue, steps to reproduce...'
	descTextarea.rows = 3
	descField.appendChild(descLabel)
	descField.appendChild(descTextarea)

	// Screenshot section
	const screenshotField = document.createElement('div')
	screenshotField.className = 'flotify-field'
	const screenshotLabel = document.createElement('label')
	screenshotLabel.className = 'flotify-label'
	screenshotLabel.textContent = 'Screenshot'
	screenshotField.appendChild(screenshotLabel)

	// Capture button
	const screenshotActions = document.createElement('div')
	screenshotActions.className = 'flotify-screenshot-actions'
	const captureBtn = document.createElement('button')
	captureBtn.type = 'button'
	captureBtn.className = 'flotify-screenshot-capture-btn'
	captureBtn.innerHTML = `${ICONS.camera} Auto-capture`
	screenshotActions.appendChild(captureBtn)
	screenshotField.appendChild(screenshotActions)

	// Preview container
	const previewContainer = document.createElement('div')
	previewContainer.style.display = 'none'

	// Drop zone
	const dropZone = createDropZone((blob) => showPreview(blob))
	screenshotField.appendChild(dropZone)
	screenshotField.appendChild(previewContainer)

	function showPreview(blob: Blob) {
		screenshotBlob = blob
		if (screenshotUrl) URL.revokeObjectURL(screenshotUrl)
		screenshotUrl = URL.createObjectURL(blob)
		previewContainer.innerHTML = ''
		previewContainer.style.display = 'block'
		dropZone.style.display = 'none'
		screenshotActions.style.display = 'none'

		const preview = document.createElement('div')
		preview.className = 'flotify-screenshot-preview'
		const img = document.createElement('img')
		img.src = screenshotUrl
		const removeBtn = document.createElement('button')
		removeBtn.className = 'flotify-screenshot-remove'
		removeBtn.innerHTML = '✕'
		removeBtn.addEventListener('click', () => {
			screenshotBlob = null
			if (screenshotUrl) {
				URL.revokeObjectURL(screenshotUrl)
				screenshotUrl = null
			}
			previewContainer.style.display = 'none'
			previewContainer.innerHTML = ''
			dropZone.style.display = ''
			screenshotActions.style.display = ''
		})
		preview.appendChild(img)
		preview.appendChild(removeBtn)
		previewContainer.appendChild(preview)
	}

	captureBtn.addEventListener('click', async () => {
		captureBtn.textContent = 'Capturing...'
		captureBtn.disabled = true
		try {
			// Temporarily hide the modal for capture
			modal.style.display = 'none'
			overlay.style.display = 'none'

			await new Promise((r) => setTimeout(r, 100))
			const blob = await captureScreenshot()

			modal.style.display = ''
			overlay.style.display = ''
			showPreview(blob)
		} catch {
			modal.style.display = ''
			overlay.style.display = ''
			captureBtn.innerHTML = `${ICONS.camera} Auto-capture`
			captureBtn.disabled = false
		}
	})

	// Assemble body
	body.appendChild(typeField)
	body.appendChild(priorityField)
	body.appendChild(titleField)
	body.appendChild(descField)
	body.appendChild(screenshotField)

	// --- Footer ---
	const footer = document.createElement('div')
	footer.className = 'flotify-modal-footer'

	const cancelBtn = document.createElement('button')
	cancelBtn.className = 'flotify-btn-cancel'
	cancelBtn.type = 'button'
	cancelBtn.textContent = 'Cancel'
	cancelBtn.addEventListener('click', onClose)

	const submitBtn = document.createElement('button')
	submitBtn.className = 'flotify-btn-submit'
	submitBtn.type = 'button'
	submitBtn.textContent = 'Submit'

	submitBtn.addEventListener('click', async () => {
		if (!titleInput.value.trim()) {
			titleInput.style.borderColor = '#ef4444'
			titleInput.focus()
			return
		}

		if (isSubmitting) return
		isSubmitting = true
		submitBtn.disabled = true
		submitBtn.textContent = 'Submitting...'

		const feedback: Feedback = {
			type: selectedType,
			title: titleInput.value.trim(),
			description: descTextarea.value.trim() || undefined,
			priority: selectedPriority,
			screenshot: screenshotBlob || undefined,
			metadata: collectMetadata(),
		}

		try {
			await onSubmit(feedback)
			showSuccess(modal, body, footer, onClose, (t) => { successTimer = t })
		} catch {
			submitBtn.textContent = 'Submit'
			submitBtn.disabled = false
			isSubmitting = false
		}
	})

	footer.appendChild(cancelBtn)
	footer.appendChild(submitBtn)

	// --- Powered by ---
	const powered = document.createElement('div')
	powered.className = 'flotify-powered'
	powered.innerHTML = 'Powered by <a href="https://flotify.dev" target="_blank" rel="noopener">Flotify</a>'

	// Assemble modal
	modal.appendChild(header)
	modal.appendChild(body)
	modal.appendChild(footer)
	modal.appendChild(powered)

	// Container
	const container = document.createElement('div')
	container.appendChild(overlay)
	container.appendChild(modal)

	const el = container as HTMLElement & { destroy: () => void }
	el.destroy = () => {
		if (screenshotUrl) {
			URL.revokeObjectURL(screenshotUrl)
			screenshotUrl = null
		}
		if (successTimer) {
			clearTimeout(successTimer)
			successTimer = null
		}
		dropZone.destroy()
	}
	return el
}

function showSuccess(
	modal: HTMLElement,
	body: HTMLElement,
	footer: HTMLElement,
	onClose: () => void,
	setTimer: (timer: ReturnType<typeof setTimeout>) => void,
): void {
	body.innerHTML = ''
	footer.style.display = 'none'

	const success = document.createElement('div')
	success.className = 'flotify-success'
	success.innerHTML = `
		${ICONS.check}
		<h4 class="flotify-success-title">Thank you!</h4>
		<p class="flotify-success-text">Your feedback has been submitted.</p>
	`
	body.appendChild(success)

	setTimer(setTimeout(onClose, 2000))
}
