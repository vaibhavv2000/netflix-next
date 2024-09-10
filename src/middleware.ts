import {cookies} from 'next/headers';
import {type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname;
 const cookie = cookies().get('netflix-user')?.value;

 if(cookie) {
  if(["/", "/register"].includes(path))
   return NextResponse.redirect(new URL('/home', request.url));
 };

 if(!cookie) {
  if(["/home", "/video"].includes(path)) return NextResponse.redirect(new URL('/', request.url));
 };

 return NextResponse.next();
};

export const config = {
  matcher: ['/', '/register', '/home', '/video'],
};