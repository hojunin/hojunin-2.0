import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export function createClient() {
	const cookieStore = cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value, ...options });
					} catch (error) {
						// The `set` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
				remove(name: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value: '', ...options });
					} catch (error) {
						// The `delete` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
}

/**
 * https://supabase.com/docs/guides/auth/server-side/nextjs?router=app
 * cookies는 어떤 일을 하는가?
 * The cookies object lets the Supabase client know how to access the cookies, so it can read and write the user session data. To make @supabase/ssr framework-agnostic, the cookies methods aren't hard-coded. These utility functions adapt @supabase/ssr's cookie handling for Next.js.
The set and remove methods for the server client need error handlers, because Next.js throws an error if cookies are set from Server Components. You can safely ignore this error because you'll set up middleware in the next step to write refreshed cookies to storage.
 */
