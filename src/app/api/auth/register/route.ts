import pg from "@/lib/pg";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
 const body = await request.json();
 const {email, password, name} = body;

 if(Object.keys(body).length !== 3) {
  return NextResponse.json({message: "All fields are necessary"}, {status: 400});
 };

 try {
  const {rows} = await pg.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if(rows[0]) {
   return NextResponse.json({message: "Email already exists"}, {status: 400});
  };

  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
  const values = [name, email, password];

  await pg.query(query, values);
  cookies().set("netflix-user",JSON.stringify({email, name}));
  return NextResponse.json({email,name},{status: 201});
 } catch (error) {
  return NextResponse.json(error, {status: 500});
 }
};