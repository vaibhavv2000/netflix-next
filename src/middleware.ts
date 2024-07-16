import {cookies} from 'next/headers';
import {NextResponse} from 'next/server'
import {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
 let pathname = request.nextUrl.pathname;
 const cookie = cookies().get("netflix-user") as any;

 if(["/", "/register"].includes(pathname)) {
  if(cookie) return NextResponse.redirect(new URL('/home',request.url));
 } else if(["/home", "/video"].includes(pathname)) {
  if(!cookie) return NextResponse.redirect(new URL('/',request.url));
 } else {
  if(cookie) return NextResponse.redirect(new URL('/home',request.url));
  else return NextResponse.redirect(new URL('/',request.url));
 };
};

export const config = {
 // matcher: ["/", "/register", "/home", "/video"],
 matcher: [ '/((?!api|_next/static|_next/image|favicon.ico).*)',]
};