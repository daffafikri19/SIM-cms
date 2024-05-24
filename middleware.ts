import { NextRequest, NextResponse } from "next/server";

export default function Middleware(req: NextRequest) {
    const token = req.cookies.get('funBreadToken');
    const currentUrl = req.nextUrl.pathname;

    if (currentUrl === '/' && token?.value) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    if(currentUrl.startsWith('/dashboard')) {
        if(!token || !token?.name || !token?.value) {
            return NextResponse.redirect(new URL('/', req.url))
        } else {
            NextResponse.next();
        }
    }
}
