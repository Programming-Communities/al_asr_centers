import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Donation section coming soon',
    status: 200 
  });
}