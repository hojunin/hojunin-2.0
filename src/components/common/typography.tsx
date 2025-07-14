import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes, forwardRef } from 'react';

const typoVariants = cva(
	'whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				h1: 'scroll-m-20 text-2xl font-bold tracking-tight sm:text-4xl sm:font-extrabold lg:text-5xl',
				h2: 'scroll-m-20 text-xl font-medium tracking-tight first:mt-0 sm:text-3xl sm:font-semibold',
				h3: 'scroll-m-20 text-lg font-semibold tracking-tight',
				h4: 'scroll-m-20 text-md font-semibold tracking-tight',
				p: 'whitespace-pre-line leading-7',
				label: 'text-primary underline-offset-4 hover:underline',
				span: '',
				time: 'text-sm text-muted-foreground',
			},
			typo: {
				mute: 'text-sm text-muted-foreground',
				small: 'text-sm font-medium leading-none',
				large: 'text-lg font-semibold',
				lead: 'text-xl text-muted-foreground',
				'inline-code':
					'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
			},
		},
		defaultVariants: {
			variant: 'p',
		},
	},
);

interface Props
	extends HTMLAttributes<
			| HTMLHeadingElement
			| HTMLParagraphElement
			| HTMLLabelElement
			| HTMLSpanElement
			| HTMLTimeElement
		>,
		VariantProps<typeof typoVariants> {}

interface Ref extends HTMLHeadElement {}

const Typography = forwardRef<Ref, Props>(({ variant, className, children, ...props }, ref) => {
	let Element: keyof JSX.IntrinsicElements = variant ? variant : 'p';

	return (
		<Element ref={ref} className={cn(typoVariants({ variant }), className)} {...props}>
			{children}
		</Element>
	);
});

Typography.displayName = 'Typography';

export default Typography;
