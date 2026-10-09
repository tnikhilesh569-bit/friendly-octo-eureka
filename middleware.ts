import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('lumi_auth_token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedPage = 
    request.nextUrl.pathname.startsWith('/dashboard') || 
    request.nextUrl.pathname.startsWith('/chat') || 
    request.nextUrl.pathname.startsWith('/call') ||
    request.nextUrl.pathname.startsWith('/settings');

  // If user tries to access protected pages without token, redirect to login
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in user tries to visit login page, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*', '/call/:path*', '/settings/:path*', '/login'],
};
