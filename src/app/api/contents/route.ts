import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {}

export async function GET(request: Request, { params }: { params: IParams }) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  const { data: contents, error } = await supabase.from('contents').select('*');

  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(contents);
}
