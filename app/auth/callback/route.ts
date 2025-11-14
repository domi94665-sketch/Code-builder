import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', requestUrl.origin));
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
