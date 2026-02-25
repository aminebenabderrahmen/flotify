export function LogoIcon({ className = 'h-7 w-7' }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="32" height="32" rx="8" fill="#09090b" />
			<path d="M22 10a1.5 1.5 0 0 1-1.5 1.5H15l-3 3V9.5A1.5 1.5 0 0 1 13.5 8h7A1.5 1.5 0 0 1 22 9.5V10z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="15.5" cy="18.5" r="1" fill="white" />
			<circle cx="19.5" cy="18.5" r="1" fill="white" />
			<path d="M10 22.5v-9A1.5 1.5 0 0 1 11.5 12H23a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-8l-4 4V22.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}
