import { ICONS } from './icons'

export function createBubble(
	position: 'bottom-right' | 'bottom-left',
	onClick: () => void,
): HTMLButtonElement {
	const bubble = document.createElement('button')
	bubble.className = 'flotify-bubble'
	bubble.innerHTML = ICONS.bubble
	bubble.setAttribute('aria-label', 'Send feedback')
	bubble.setAttribute('title', 'Send feedback')

	if (position === 'bottom-right') {
		bubble.style.bottom = '20px'
		bubble.style.right = '20px'
	} else {
		bubble.style.bottom = '20px'
		bubble.style.left = '20px'
	}

	bubble.addEventListener('click', onClick)

	return bubble
}
