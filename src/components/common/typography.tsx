import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes, forwardRef } from 'react';

const typoVariants = cva(
	'whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
				h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
				h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
				h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
				p: 'whitespace-pre-line leading-7',
				label: 'text-primary underline-offset-4 hover:underline',
				span: '',
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
			variant: 'h1',
		},
	},
);

interface Props extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof typoVariants> {}

interface Ref extends HTMLHeadElement {}

const Typography = forwardRef<Ref, Props>(({ variant, className, children, ...props }, ref) => {
	let Element: keyof JSX.IntrinsicElements = 'p';

	switch (variant) {
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'p':
		case 'label':
		case 'span':
			Element = variant;
			break;
		default:
			break;
	}
	return (
		<Element ref={ref} className={cn(typoVariants({ variant }), className)} {...props}>
			{children}
		</Element>
	);
});

Typography.displayName = 'Typography';

export default Typography;
