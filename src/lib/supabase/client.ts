import { createBrowserClient } from '@supabase/ssr';

/**
 * 'use client'에서는 이 클라이언트를 호출합니다. 브라우져에서 실행됩니다.
 * @returns
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
