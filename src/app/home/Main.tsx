"use client";

import {useEffect,useState} from "react";
import Featured,{movie} from "./Featured";
import Lists from "./Lists";
import MovieCard from "./MovieCard";
import {API} from "@/lib/API";
import {addMovies, addMyList} from "@/redux/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import Loader from "@/components/Loader";

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
   };
  };

  if(moviesList.length < 1) fetcher();
 },[moviesList]);

 return (
  <main className="bg-black" style={{maxWidth: "2350px",margin: "auto"}}>
   {moviesList.length ? <>
    <Featured setPos={setPos} />
    {moviesList.length && lists.map((l: string,i: number) => <Lists title={l} setPos={setPos} key={`list-${i}`} />)}
    {pos && <MovieCard pos={pos} />}
    </> : <div className="grid place-items-center h-screen"><Loader /></div>
   }
  </main>
 );
};

export default Main;