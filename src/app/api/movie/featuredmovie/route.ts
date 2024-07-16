import pg from "@/lib/pg";
import {NextResponse} from "next/server";

export async function GET() {
 const query = `SELECT * FROM movies ORDER BY random() LIMIT 1`;
 try {
  const random_movie = await pg.query(query);
  return NextResponse.json(random_movie.rows[0],{status: 200});
 } catch(error) {
  return NextResponse.json({message:error},{status: 500});
 };
};