import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none',
	{
		variants: {
			variant: {
				default: 'bg-gray-900 text-white shadow-xs hover:bg-gray-800',
				outline:
					'border border-gray-200 bg-white shadow-xs hover:bg-gray-50 hover:text-gray-900',
				ghost: 'hover:bg-gray-100 hover:text-gray-900',
				link: 'text-gray-900 underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 px-3 gap-1.5',
				lg: 'h-10 px-6 text-base',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

function Button({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
	return (
		<button
			className={cn(buttonVariants({ variant, size, className }), 'rounded-full')}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
