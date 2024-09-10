import pg from "./pg";
import {movies} from "./moviesList";

const users = `
 CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(500) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  password VARCHAR(500) NOT NULL,
  wishlist INT[],
  CONSTRAINT users_email_idx UNIQUE (email)
 )
`;

const moviesTable = `
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


const generateTables = async () => {
 try {
  await pg.query(users);
  await pg.query(moviesTable);

  await Promise.all(movies.map(async (movie) => {
   const {thumbnail,rating,title_img,description,pg: PG} = movie;
   const {length,type,genre,release_year,movie_name} = movie;

   const query = `
    INSERT INTO movies 
    (movie_name, release_year, thumbnail, rating, length, title_img, pg, type, genre, description)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
   `;

   const values = [movie_name, release_year, thumbnail, rating, length, title_img, PG, type, genre, description];

   try {
    await pg.query(query, values);
   } catch (error) {
    console.log("ERROR",error);
   };
  }));
 } catch (error) {
  throw (error);
 };
};

export default generateTables;