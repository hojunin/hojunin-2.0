import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
  category: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('contents')
    .select('*')
    .eq('category', params.category);

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
