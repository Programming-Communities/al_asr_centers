import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Quran section coming soon',
    status: 200 
  });
}