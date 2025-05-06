import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./mdx-components.tsx',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				mb: '440px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				code: {
					green: '#b5f4a5',
					yellow: '#ffe484',
					purple: '#d9a9ff',
					red: '#ff8383',
					blue: '#93ddfd',
					white: '#fff',
				},
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in var(--animation-duration) var(--animation-delay) ease-in-out',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%',
						color: 'var(--tw-prose-body)',
						h1: {
							fontWeight: '700',
							marginTop: '1.5em',
							marginBottom: '0.5em',
						},
						h2: {
							fontWeight: '600',
							marginTop: '1.25em',
							marginBottom: '0.5em',
						},
						h3: {
							fontWeight: '600',
							marginTop: '1em',
							marginBottom: '0.5em',
						},
						p: {
							marginTop: '1em',
							marginBottom: '1em',
						},
						a: {
							color: 'var(--tw-prose-links)',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						pre: {
							backgroundColor: 'var(--tw-prose-pre-bg)',
							padding: '1em',
							borderRadius: '0.375rem',
							overflow: 'auto',
						},
						code: {
							fontWeight: '400',
							backgroundColor: 'var(--tw-prose-pre-bg)',
							padding: '0.25em',
							borderRadius: '0.25rem',
						},
					},
				},
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('tailwind-scrollbar-hide'),
		require('@tailwindcss/typography'),
	],
} satisfies Config;

export default config;
