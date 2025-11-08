// Auth disabled: return 404 for any auth attempts (static export mode)
import type { NextRequest } from 'next/server';

export function GET(_req: NextRequest) {
  return new Response('Auth disabled', { status: 404 });
}

export function POST(_req: NextRequest) {
  return new Response('Auth disabled', { status: 404 });
}