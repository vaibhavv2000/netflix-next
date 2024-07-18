import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {email,movieId} = await req.json();

 if(!email || !movieId)
  return NextResponse.json({message: "All fields are required"},{status:400});

 const query = `DELETE FROM usermovieslist WHERE email = $1 AND movieId = $2`;
  
 try {
  await pg.query(query,[email,movieId]);
  return NextResponse.json({message: "Removed"},{status: 200});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 }
}