import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req:NextRequest) {
 const email = req.nextUrl.searchParams.get("email");

 if(!email) {
  return NextResponse.json({message: "All fields are required"},{status:400});
 };

 try {
  const movieIds = await pg.query(`SELECT * FROM usermovieslist WHERE email = $1`,[email]);

  const movies = await Promise.all(
   movieIds.rows.map(async (m) => {
    return (await pg.query(`SELECT * FROM movies WHERE id = $1`,[m.movieid])).rows[0];
   })
  );

  return NextResponse.json(movies,{status: 200});
 } catch (error) {
  return NextResponse.json(error,{status:500});
 };
};