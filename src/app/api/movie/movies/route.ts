import pg from "@/lib/pg";
import {NextResponse} from "next/server";

export async function GET() {
 const query = `SELECT * FROM movies ORDER BY random() LIMIT 10`;
 try {
  const random_movies = await pg.query(query);
  return NextResponse.json(random_movies.rows,{status: 200});
 } catch(error) {
  return NextResponse.json(error,{status: 500});
 };
};