import pg from "@/lib/pg";
import {NextResponse} from "next/server";

export async function GET() {
 try {
  const random_movie = await pg.query(`SELECT * FROM movies ORDER BY random() LIMIT 1`);
  return NextResponse.json(random_movie.rows[0],{status: 200});
 } catch(error) {
  return NextResponse.json(error,{status: 500});
 };
};