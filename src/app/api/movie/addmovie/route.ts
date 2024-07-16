import {movie} from "@/lib/moviesList";
import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const body = await req.json() as movie;
 const {
    thumbnail,
    rating,
    title_img,
    description,
    length,
    type,
    genre,
    release_year,
    movie_name,
  } = body;

  try {
   await pg.query(
      `INSERT INTO movies (thumbnail, rating, title_img, description, length, 
        pg, type, genre, release_year, movie_name)
        VALUES 
       ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        thumbnail,
        rating,
        title_img,
        description,
        length,
        body.pg,
        type,
        genre,
        release_year,
        movie_name,
      ]
    );

    return NextResponse.json({message: "Movie Added"},{status:201});
  } catch(error) {
    return NextResponse.json({message:error},{status: 500});
  }
}