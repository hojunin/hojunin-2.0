import { NextResponse } from 'next/server';

interface IParams {}

export async function GET(request: Request, { params }: { params: IParams }) {
  return NextResponse.json({ message: 'hello world' });
}
