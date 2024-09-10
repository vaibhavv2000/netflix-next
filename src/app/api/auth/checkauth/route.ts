import pg from "@/lib/pg";
import JWT from "@/utils/JWT";
import type {user} from "@/utils/types";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
 const cookie = cookies().get("netflix-user");
 const {name, email, id} = JWT.decode(cookie?.value as string) as user;

 if(!id) {
  cookies().delete("netflix-user");
  return NextResponse.json({success: false},{status: 401});
 };

 try {
  const {rows: [{wishlist}]} = await pg.query("SELECT wishlist FROM users WHERE id = $1", [id]);
  return NextResponse.json({name, email, id, wishlist},{status: 200});
 } catch (error) {
  return NextResponse.json(error,{status: 500});
 };
};