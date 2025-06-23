import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('nt.authtoken');
    const isPublicRoute = '/auth/login';

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // if (token && isPublicRoute) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
