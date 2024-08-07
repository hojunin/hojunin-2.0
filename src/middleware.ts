import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});
	const { pathname } = request.nextUrl;

	if (pathname.endsWith('.php')) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
					});
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: '',
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value: '',
						...options,
					});
				},
			},
		},
	);

	await supabase.auth.getUser();

	try {
		const { pathname } = request.nextUrl;
		const excludedPaths = [
			'/about',
			'/contents',
			'/admin',
			'/challenge',
			'/login',
			'/memoir',
			'/feed.xml',
			'/rss.xml',
			'/sitemap.xml',
			'/robots.txt',
			'/font/nanum_hand.ttf',
			'/opengraph-image',
		];

		if (
			!excludedPaths.includes(pathname) &&
			!pathname.startsWith('/contents/') &&
			pathname !== '/'
		) {
			const slug = pathname.slice(1);
			if (slug) {
				return NextResponse.redirect(new URL(`/contents/${slug}`, request.url));
			}
		}
		return response;
	} catch (error) {
		console.error(error);
		return response;
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
