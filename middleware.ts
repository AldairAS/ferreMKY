import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // Redirect to login if there is no session
    if (!req.nextUrl.pathname.includes("/sign-in")) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  } else if (req.nextUrl.pathname.includes("/sign-in")) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  } else {
    NextResponse.next();
  }
  
  return res
}


// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [

   '/dashboard/:path*','/sign-in'
  ],
}