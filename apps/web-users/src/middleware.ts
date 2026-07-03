import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    //grab the access token from the cookie
    const accessToken = req.cookies.get('accessToken')?.value;
    const { pathname } = req.nextUrl;

    //lets define protected paths
    const isProtectedRoute = pathname.startsWith('/checkout') || pathname.startsWith('/profile') || pathname.startsWith('/admin');
    const isAuthRoute = pathname.startsWith('auth');

    //redirection
    if(isProtectedRoute && !accessToken){
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if(isAuthRoute && accessToken){
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
};

//define where the middlware should run
export const config = {
    matcher: ['/checkout/:path*', '/profile/:path*', '/admin/:path*', '/auth/:path*'],
}