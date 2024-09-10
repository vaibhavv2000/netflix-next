import pg from "@/lib/pg";
import JWT from "@/utils/JWT";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
 const cookie = cookies().get("netflix-user")?.value;
 const {id} = JWT.decode(cookie as string) as {id: number};

 if(!id) return NextResponse.json({message: "All fields are required"},{status:400});

 let query = `
  SELECT m.* FROM wishlist INNER JOIN movies m 
  ON wishlist.movieId = m.id WHERE wishlist.userId = $1
 `;

 try {
  const {rows} = await pg.query(query,[id]);
  return NextResponse.json(rows, {status: 200});
 } catch (error) {
  return NextResponse.json(error,{status:500});
 };
};