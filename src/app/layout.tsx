import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/common/layout';
import { ThemeProvider } from '@/components/common/theme-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import QueryProvider from '@/context/react-query-provider';
import { Clarity } from '@/components/common/clarity';
import AmplitudeContextProvider from '@/context/amplitude-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '홈 | HJINN',
	description: '프론트엔드 개발자 인호준의 개인 웹사이트입니다',
	metadataBase: new URL('https://hojunin.com'),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Clarity />
			<body className={inter.className}>
				<ThemeProvider attribute="class" enableSystem defaultTheme="system">
					<AmplitudeContextProvider>
						<QueryProvider>
							<Layout>{children}</Layout>
							<Toaster />
						</QueryProvider>
					</AmplitudeContextProvider>
				</ThemeProvider>

				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
