import type {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";

const cookieOptions = {
 maxAge: 1000 * 60 * 60 * 24 * 30,
 httpOnly: !true,
//  path: "/",
 sameSite: true,
 secure: process.env.NODE_ENV === "production", 
} as ResponseCookie;

export default cookieOptions;