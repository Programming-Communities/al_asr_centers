import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Hadith section coming soon',
    status: 200 
  });
}