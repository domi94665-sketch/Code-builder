import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

const protectedRoutes = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*']
};
