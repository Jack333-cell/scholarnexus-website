import { NextResponse } from 'next/server';
import { geminiStatus } from '../../../../lib/gemini';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json(await geminiStatus()); }
