"use client";

import {useEffect,useState} from "react";
import Featured,{movie} from "./Featured";
import Lists from "./Lists";
import MovieCard from "./MovieCard";
import {API} from "@/lib/API";
import {addMovies, addMyList} from "@/redux/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "@/lib/redux";

let lists = [
"Featured Movies","New Releases","Popular Movies","Horror Thriller","Comedy Movies","My List"
];

export interface state {
  x: number;
  y: number;
  movie: movie;
};

const Main = () => {
 const [pos,setPos] = useState<state | null>(null);

 const {moviesList} = useAppSelector(state => state.movie);
 const dispatch = useAppDispatch();

 useEffect(() => {
  const u = localStorage.getItem("netflix-user") as string;
  let user = JSON.parse(u);

  async function fetcher() {
   try {
    const movies = async () => {
     let res = await API.get(`/movie/movies`);
     let data = await res.data;
     return data;
    };
  
    const userList = async () => {
     let res = await API.get(`/movie/getlist?email=${user.email}`);
     let data = await res.data;
     return data;
    };
  
    const data: [[],[]] = await Promise.all([movies(),userList()]);

    dispatch(addMovies(data[0]));
    dispatch(addMyList(data[1]));
   } catch(error: any) {
     console.log("ERROR",error);
   }
  };

  if(moviesList.length < 1) fetcher();
 },[moviesList]);

 return (
  <div className="bg-black" style={{maxWidth: "2350px",margin: "auto"}}>
   <Featured setPos={setPos} />
   {moviesList.length && lists.map((l: string,i: number) => <Lists title={l} setPos={setPos} key={String(`r${i}`)} />)}
   {pos && <MovieCard pos={pos} />}
  </div>
 );
};

export default Main;