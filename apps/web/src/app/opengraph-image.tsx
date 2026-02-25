import { ImageResponse } from 'next/og'

export const alt = 'Flotify — Collect feedback. Push to your board.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
	const manrope = await fetch(
		new URL('https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F.ttf'),
	).then((res) => res.arrayBuffer())

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '80px',
					backgroundColor: '#09090b',
					fontFamily: 'Manrope',
				}}
			>
				{/* Logo + name */}
				<div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
					{/* Icon */}
					<div
						style={{
							width: '56px',
							height: '56px',
							borderRadius: '14px',
							backgroundColor: '#27272a',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
							<path
								d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<span style={{ fontSize: '36px', fontWeight: 700, color: '#ffffff' }}>
						Flotify
					</span>
				</div>

				{/* Headline */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
					}}
				>
					<span style={{ fontSize: '64px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
						Collect feedback.
					</span>
					<span style={{ fontSize: '64px', fontWeight: 800, color: '#71717a', lineHeight: 1.1 }}>
						Push to your board.
					</span>
				</div>

				{/* Footer */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '24px',
						marginTop: '48px',
					}}
				>
					<span style={{ fontSize: '20px', color: '#a1a1aa' }}>
						flotify.dev
					</span>
					<span style={{ fontSize: '20px', color: '#3f3f46' }}>
						·
					</span>
					<span style={{ fontSize: '20px', color: '#a1a1aa' }}>
						Open source
					</span>
					<span style={{ fontSize: '20px', color: '#3f3f46' }}>
						·
					</span>
					<span style={{ fontSize: '20px', color: '#a1a1aa' }}>
						Free forever
					</span>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Manrope',
					data: manrope,
					style: 'normal',
					weight: 700,
				},
			],
		},
	)
}
