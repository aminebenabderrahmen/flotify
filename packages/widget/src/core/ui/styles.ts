export function injectStyles(accentColor: string, theme: 'light' | 'dark'): void {
	if (document.getElementById('flotify-styles')) return

	const isDark = theme === 'dark'
	const bg = isDark ? '#09090b' : '#ffffff'
	const bgMuted = isDark ? '#18181b' : '#f4f4f5'
	const border = isDark ? '#27272a' : '#e4e4e7'
	const text = isDark ? '#fafafa' : '#09090b'
	const textMuted = isDark ? '#a1a1aa' : '#71717a'

	const style = document.createElement('style')
	style.id = 'flotify-styles'
	style.textContent = `
		.flotify-bubble {
			position: fixed;
			z-index: 2147483647;
			width: 48px;
			height: 48px;
			border-radius: 9999px;
			background: ${accentColor};
			color: white;
			border: none;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
			transition: transform 0.15s ease, box-shadow 0.15s ease;
		}
		.flotify-bubble:hover {
			transform: scale(1.05);
			box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		}
		.flotify-bubble svg {
			width: 20px;
			height: 20px;
		}

		.flotify-overlay {
			position: fixed;
			inset: 0;
			z-index: 2147483646;
			background: transparent;
		}

		.flotify-modal {
			position: fixed;
			z-index: 2147483647;
			width: 380px;
			max-height: 520px;
			background: ${bg};
			border: 1px solid ${border};
			border-radius: 12px;
			box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			color: ${text};
			overflow: hidden;
			animation: flotify-slide-in 0.15s ease-out;
		}

		@keyframes flotify-slide-in {
			from { opacity: 0; transform: translateY(8px); }
			to { opacity: 1; transform: translateY(0); }
		}

		.flotify-modal-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16px 20px;
			border-bottom: 1px solid ${border};
		}
		.flotify-modal-title {
			font-size: 14px;
			font-weight: 600;
			margin: 0;
		}
		.flotify-modal-close {
			background: none;
			border: none;
			cursor: pointer;
			color: ${textMuted};
			padding: 4px;
			border-radius: 6px;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: color 0.15s ease;
		}
		.flotify-modal-close:hover { color: ${text}; }
		.flotify-modal-close svg { width: 16px; height: 16px; }

		.flotify-modal-body {
			padding: 20px;
			overflow-y: auto;
			max-height: 420px;
		}

		.flotify-field {
			margin-bottom: 16px;
		}
		.flotify-label {
			display: block;
			font-size: 13px;
			font-weight: 500;
			color: ${text};
			margin-bottom: 6px;
		}
		.flotify-label-required::after {
			content: ' *';
			color: #ef4444;
		}

		.flotify-type-group {
			display: flex;
			gap: 6px;
		}
		.flotify-type-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			padding: 8px 12px;
			font-size: 13px;
			font-weight: 500;
			border: 1px solid ${border};
			border-radius: 9999px;
			background: ${bg};
			color: ${textMuted};
			cursor: pointer;
			transition: all 0.15s ease;
		}
		.flotify-type-btn:hover { border-color: ${accentColor}; color: ${text}; }
		.flotify-type-btn[data-active="true"] {
			border-color: ${accentColor};
			background: ${accentColor}10;
			color: ${accentColor};
		}

		.flotify-select,
		.flotify-input,
		.flotify-textarea {
			width: 100%;
			padding: 8px 12px;
			font-size: 13px;
			border: 1px solid ${border};
			border-radius: 9999px;
			background: ${bg};
			color: ${text};
			outline: none;
			transition: border-color 0.15s ease;
			box-sizing: border-box;
			font-family: inherit;
		}
		.flotify-textarea {
			border-radius: 10px;
			resize: vertical;
			min-height: 80px;
		}
		.flotify-select:focus,
		.flotify-input:focus,
		.flotify-textarea:focus {
			border-color: ${accentColor};
		}

		.flotify-screenshot-zone {
			border: 2px dashed ${border};
			border-radius: 10px;
			padding: 16px;
			text-align: center;
			cursor: pointer;
			transition: border-color 0.15s ease, background 0.15s ease;
			color: ${textMuted};
			font-size: 13px;
		}
		.flotify-screenshot-zone:hover {
			border-color: ${accentColor};
			background: ${bgMuted};
		}
		.flotify-screenshot-zone svg {
			width: 24px;
			height: 24px;
			margin: 0 auto 8px;
			display: block;
		}

		.flotify-screenshot-actions {
			display: flex;
			gap: 8px;
			margin-bottom: 10px;
		}
		.flotify-screenshot-capture-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			padding: 8px 12px;
			font-size: 13px;
			font-weight: 500;
			border: 1px solid ${border};
			border-radius: 9999px;
			background: ${bg};
			color: ${text};
			cursor: pointer;
			transition: all 0.15s ease;
			font-family: inherit;
		}
		.flotify-screenshot-capture-btn:hover {
			border-color: ${accentColor};
			background: ${bgMuted};
		}

		.flotify-screenshot-preview {
			position: relative;
			border-radius: 10px;
			overflow: hidden;
			border: 1px solid ${border};
		}
		.flotify-screenshot-preview img {
			width: 100%;
			display: block;
		}
		.flotify-screenshot-remove {
			position: absolute;
			top: 6px;
			right: 6px;
			width: 24px;
			height: 24px;
			border-radius: 9999px;
			background: rgba(0,0,0,0.6);
			color: white;
			border: none;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
		}

		.flotify-modal-footer {
			display: flex;
			justify-content: flex-end;
			gap: 8px;
			padding: 16px 20px;
			border-top: 1px solid ${border};
		}
		.flotify-btn-cancel {
			padding: 8px 16px;
			font-size: 13px;
			font-weight: 500;
			border: 1px solid ${border};
			border-radius: 9999px;
			background: ${bg};
			color: ${text};
			cursor: pointer;
			transition: background 0.15s ease;
			font-family: inherit;
		}
		.flotify-btn-cancel:hover { background: ${bgMuted}; }
		.flotify-btn-submit {
			padding: 8px 20px;
			font-size: 13px;
			font-weight: 500;
			border: none;
			border-radius: 9999px;
			background: ${accentColor};
			color: white;
			cursor: pointer;
			transition: opacity 0.15s ease;
			font-family: inherit;
		}
		.flotify-btn-submit:hover { opacity: 0.9; }
		.flotify-btn-submit:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.flotify-success {
			text-align: center;
			padding: 40px 20px;
		}
		.flotify-success svg {
			width: 40px;
			height: 40px;
			color: #22c55e;
			margin: 0 auto 12px;
		}
		.flotify-success-title {
			font-size: 15px;
			font-weight: 600;
			margin: 0 0 4px;
		}
		.flotify-success-text {
			font-size: 13px;
			color: ${textMuted};
			margin: 0;
		}

		.flotify-powered {
			text-align: center;
			padding: 8px;
			font-size: 11px;
			color: ${textMuted};
			border-top: 1px solid ${border};
		}
		.flotify-powered a {
			color: ${textMuted};
			text-decoration: underline;
			text-underline-offset: 2px;
		}
		.flotify-powered a:hover { color: ${text}; }
	`
	document.head.appendChild(style)
}
