import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('contents')
    .select('*, tag(name)')
    .eq('slug', params.slug)
    .single();

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
