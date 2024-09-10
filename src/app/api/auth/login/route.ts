import {validateEmail} from "@/lib/emailValidator";
import pg from "@/lib/pg";
import cookieOptions from "@/utils/cookieOptions";
import JWT from "@/utils/JWT";
import type {userTypes} from "@/utils/types";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";
import {type NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
 const body = await request.json();
 let {email, password = ""} = body as userTypes;

 email = email.trim();
 password = password.trim();

 if(!email || !password)
  return NextResponse.json({message: "All fields are necessary"}, {status: 400});

 if(!validateEmail(email))
  return NextResponse.json({message: "Email is Invalid"}, {status: 400});  

 if(password.length < 8) 
  return NextResponse.json({message: "Password must have 8 characters"}, {status: 400});

 if(password.includes(" "))
  return NextResponse.json({message: "Password should not includes character ' '"}, {status: 400});

 try {
  const {rows: [user]} = await pg.query(`SELECT * FROM users WHERE email = $1`, [email]);

  if(!user)
   return NextResponse.json({message: `No Account found with email ${email}`}, {status: 404});

  const checkPassword = await bcrypt.compare(password, user.password);

  if(!checkPassword) 
   return NextResponse.json({message: "Email or Password is wrong"}, {status: 400});

  const token = JWT.sign({id: user.id, email, name: user.name});

  cookies().set("netflix-user", token, cookieOptions);

  const {wishlist, id, name} = user;

  return NextResponse.json({user: {id, email, name, wishlist}, token},{status: 200});
 } catch (error) {
  return NextResponse.json(error, {status: 500});
 };
};