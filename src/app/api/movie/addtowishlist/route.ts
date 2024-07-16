import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {email,movieId} = await req.json();

 if(!email || !movieId)
  return NextResponse.json({message: "All fields are required"},{status:400});

 const query = `INSERT INTO usermovieslist (email, movieid) VALUES ($1, $2)`;
  
 try {
  await pg.query(query,[email,movieId]);
  return NextResponse.json({message: "Added"},{status: 201});
 } catch(error) {
  return NextResponse.json({message:error},{status:500});
 }
}