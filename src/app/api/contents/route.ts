import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {}

// contents 상세 SSG용 API
export async function GET(request: Request, { params }: { params: IParams }) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  const { data: contents, error } = await supabase
    .from('contents')
    .select('slug');

  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(contents);
}
