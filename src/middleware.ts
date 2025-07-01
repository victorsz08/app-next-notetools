import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('nt.authtoken');
    const pathname = request.nextUrl.pathname;

    if (token) {
        if (pathname === '/auth/login') {
            return NextResponse.redirect(new URL('/', request.url)); // Redirect to home page or dashboard
        }
        return NextResponse.next();
    } else {
        if (pathname !== '/auth/login') {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all routes except API, static files, and favicon
};
