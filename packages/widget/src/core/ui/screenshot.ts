type Html2CanvasFn = (element: HTMLElement, options?: Record<string, unknown>) => Promise<HTMLCanvasElement>

function loadHtml2Canvas(): Promise<Html2CanvasFn> {
	const w = window as any
	if (w.html2canvas) return Promise.resolve(w.html2canvas)

	return new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src =
			'https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/dist/html2canvas-pro.min.js'
		script.onload = () => {
			if (w.html2canvas) resolve(w.html2canvas)
			else reject(new Error('html2canvas-pro failed to load'))
		}
		script.onerror = () => reject(new Error('Failed to load html2canvas-pro'))
		document.head.appendChild(script)
	})
}

export async function captureScreenshot(): Promise<Blob> {
	const html2canvas = await loadHtml2Canvas()

	// Hide flotify elements during capture
	const modal = document.querySelector('.flotify-modal') as HTMLElement | null
	const bubble = document.querySelector('.flotify-bubble') as HTMLElement | null
	const overlay = document.querySelector('.flotify-overlay') as HTMLElement | null

	if (modal) modal.style.display = 'none'
	if (bubble) bubble.style.display = 'none'
	if (overlay) overlay.style.display = 'none'

	// Wait for repaint
	await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

	try {
		const canvas = await html2canvas(document.body, {
			useCORS: true,
			allowTaint: true,
			scale: 1,
			logging: false,
		})

		return new Promise<Blob>((resolve, reject) => {
			canvas.toBlob(
				(blob) => {
					if (blob) resolve(blob)
					else reject(new Error('Failed to capture screenshot'))
				},
				'image/png',
				0.9,
			)
		})
	} finally {
		if (modal) modal.style.display = ''
		if (bubble) bubble.style.display = ''
		if (overlay) overlay.style.display = ''
	}
}

export function createDropZone(
	onFile: (blob: Blob) => void,
): HTMLElement & { destroy: () => void } {
	const zone = document.createElement('div')
	zone.className = 'flotify-screenshot-zone'
	zone.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
		Drop, paste or click to add image
	`

	const fileInput = document.createElement('input')
	fileInput.type = 'file'
	fileInput.accept = 'image/*'
	fileInput.style.display = 'none'

	fileInput.addEventListener('change', () => {
		const file = fileInput.files?.[0]
		if (file) onFile(file)
	})

	zone.addEventListener('click', () => fileInput.click())

	zone.addEventListener('dragover', (e) => {
		e.preventDefault()
		zone.style.borderColor = ''
	})

	zone.addEventListener('dragleave', () => {
		zone.style.borderColor = ''
	})

	zone.addEventListener('drop', (e) => {
		e.preventDefault()
		const file = e.dataTransfer?.files[0]
		if (file?.type.startsWith('image/')) onFile(file)
	})

	// Paste support
	const pasteHandler = (e: ClipboardEvent) => {
		const items = e.clipboardData?.items
		if (!items) return
		for (const item of items) {
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile()
				if (file) onFile(file)
				break
			}
		}
	}
	document.addEventListener('paste', pasteHandler)

	zone.appendChild(fileInput)

	const el = zone as HTMLElement & { destroy: () => void }
	el.destroy = () => {
		document.removeEventListener('paste', pasteHandler)
	}
	return el
}
