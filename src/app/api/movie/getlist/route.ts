import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {NextResponse} from "next/server";

export async function GET() {
 const {id} = getUser() as user;
 if(!id) return NextResponse.json({message: "Unauthorized"},{status:401});

 let query = `SELECT m.* FROM wishlist INNER JOIN movies m 
  ON wishlist.movieId = m.id WHERE wishlist.userId = $1`;

 try {
  const {rows} = await pg.query(query,[id]);
  return NextResponse.json(rows, {status: 200});
 } catch (error) {
  return NextResponse.json(error,{status:500});
 };
};