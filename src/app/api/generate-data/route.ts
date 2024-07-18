import {movie, movies} from "@/lib/moviesList";
import pg from "@/lib/pg";
import {NextResponse} from "next/server";

const db = `
 DO $$
  BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'netflix') THEN
    PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE netflix');
   END IF;
  END
 $$
`;

const users = `
 CREATE TABLE IF NOT EXISTS users (
  email VARCHAR(500) NOT NULL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL
 )
`;

const movies_table = `
 DO $$
 BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'movie_type') THEN
  CREATE TYPE movie_type AS ENUM ('web_series', 'movie', 'animation');
 END IF;

 CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  thumbnail VARCHAR(1000) NOT NULL,
  rating FLOAT NOT NULL,
  movie_name VARCHAR(1000),
  title_img VARCHAR(2000) NOT NULL,
  description VARCHAR(5000),
  length FLOAT NOT NULL,
  pg BOOLEAN,
  release_year INT NOT NULL,
  type movie_type,
  genre VARCHAR(200) NOT NULL
 );

 BEGIN
  ALTER TABLE movies
  ALTER COLUMN type TYPE movie_type
  USING type::movie_type;
 EXCEPTION
  WHEN undefined_column THEN
   NULL;
  END;
 END $$;
`;

const userMoviesList = `
 CREATE TABLE IF NOT EXISTS userMoviesList (
  id SERIAL PRIMARY KEY,
  email VARCHAR(500) NOT NULL,
  movieId INT NOT NULL,
  FOREIGN KEY (movieId) REFERENCES movies(id) ON DELETE CASCADE
)`;

const createIndex = `CREATE INDEX email_index ON usermovieslist(email)`;

const addMovies = () => {
 for(let i of movies) {
  const fun = async (m: movie) => { 
   const {thumbnail,rating,title_img,description,pg: PG} = m;
   const {length,type,genre,release_year,movie_name} = m;

   const query = `INSERT INTO movies 
    (movie_name, release_year, thumbnail, rating, length, title_img, pg, type, genre, description)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
   `;

   const values = [movie_name, release_year, thumbnail, rating, length, title_img, PG, type, genre, description];

   try {
    await pg.query(query, values);
    console.log("ADDED MOVIE");
   } catch (error) {
    console.log("ERROR",error);
   };
  };

  fun(i);
 };
};

export async function GET() {
 try {
  // await pg.query(db);
  // await pg.query(users);
  // await pg.query(movies_table);
  // await pg.query(userMoviesList);
  // await pg.query(createIndex);
  // await pg.query(add_movies);
  // addMovies();

  return NextResponse.json({message: "Data created"}, {status: 201});
 } catch(error) {
  return NextResponse.json(error,{status: 500});
 }
};