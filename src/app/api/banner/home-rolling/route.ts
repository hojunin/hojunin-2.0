import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';
interface IParams {}

export async function GET(request: Request, { params }: { params: IParams }) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  const { data, error } = await supabase
    .from('home_rolling_banner')
    .select('*')
    .eq('status', 'active')
    .lte('impression_started', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    .gte('impression_ended', dayjs().format('YYYY-MM-DD HH:mm:ss'));
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(data);
}
