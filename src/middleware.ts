import { NextResponse, type NextRequest } from 'next/server';

const publicRoutes = ['/auth/login'];

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('nt.authtoken');
    const pathname = request.nextUrl.pathname;

    console.log(token);

    const isPublicRoute = publicRoutes.includes(pathname);

    // Se não estiver logado e tentando acessar rota privada
    // if (!token && !isPublicRoute) {
    //     return NextResponse.redirect(new URL('/auth/login', request.url));
    // }

    // // Se estiver logado e tentar acessar login
    // if (token && isPublicRoute) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$|api).*)',
    ],
};
