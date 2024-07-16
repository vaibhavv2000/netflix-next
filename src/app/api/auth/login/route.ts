import pg from "@/lib/pg";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
 const body = await request.json();
 const {email, password} = body;

 if(!email || !password) {
  return NextResponse.json({message: "All fields are necessary"}, {status: 400});
 };

 try {
  const {rows} = await pg.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if(!rows[0]) return NextResponse.json({message: "No email found"}, {status: 404});
  if(rows[0].password !== password) {
   return NextResponse.json({message: "Wrong PWD"}, {status: 400});
  };
  cookies().set("netflix-user",rows[0]);
  return NextResponse.json({email, name: rows[0].name},{status: 200});
 } catch (error) {
  return NextResponse.json(error, {status: 500});
 }
};