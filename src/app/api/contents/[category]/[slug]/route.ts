import { createClient } from '@/lib/supabase/server';
import { ValueOf } from '@/types/common';
import { ContentsCategory } from '@/types/contents';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
  category: ValueOf<typeof ContentsCategory>;
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('contents')
    .select('*')
    .eq('category', params.category)
    .eq('slug', params.slug)
    .single();

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
