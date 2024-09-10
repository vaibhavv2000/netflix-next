import pg from "@/lib/pg";
import {cookies} from "next/headers";
import cookieOptions from "@/utils/cookieOptions";
import bcrypt from "bcrypt";
import {type NextRequest, NextResponse} from "next/server";
import type {userTypes} from "@/utils/types";
import JWT from "@/utils/JWT";

export async function POST(request: NextRequest) {
 let {email, password, name} = await request.json() as userTypes;

 email = email.trim();
 name = name.trim();
 password = password?.trim();

 if(!email || !name || !password)
  return NextResponse.json({message: "All fields are necessary"}, {status: 400});

 try {
  const {rows} = await pg.query(`SELECT email FROM users WHERE email = $1`, [email]);

  if(rows[0])
   return NextResponse.json({message: "Email already exists"}, {status: 400});

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
  const values = [name, email, hash];

  const {rows: [{id}]} = await pg.query(query, values);

  const token = JWT.sign({id, email, name});
 
  cookies().set("netflix-user", token, cookieOptions);
  
  return NextResponse.json({user: {id, email, name, wishlist: []}, token},{status: 201});
 } catch (error) {
  return NextResponse.json(error, {status: 500});
 };
};