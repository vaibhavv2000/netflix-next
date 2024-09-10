"use client";

import {useEffect,useState} from "react";
import Featured from "./Featured";
import Lists from "./Lists";
import MovieCard from "./MovieCard";
import {API} from "@/lib/API";
import {addMovies} from "@/redux/movieSlice";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import Loader from "@/components/Loader";
import type { position} from "@/utils/types";
import {useRouter} from "next/navigation";

let lists = [
"Featured Movies","New Releases","Popular Movies","Horror Thriller","Comedy Movies","My List"
];

const Main = () => {
 const [position,setPosition] = useState<position | null>(null);

 const {movies} = useAppSelector(state => state.movie);
 const dispatch = useAppDispatch();
 const {push} = useRouter();

 useEffect(() => {
  async function fetcher() {
   try {
    let {data} = await API.get(`/movie/movies`);
    dispatch(addMovies(data));
   } catch(error: any) {
    push("/");
   };
  };

  if(movies.length < 1) fetcher();
 },[movies]);

 const handleSetPosition = (position: position | null) => setPosition(position);

 return (
  <>
   {movies.length && <Featured handleSetPosition={handleSetPosition} />}
   {movies.length && lists.map((title: string, index: number) => (
    <Lists title={title} handleSetPosition={handleSetPosition} key={`list-${index}`} />  
   ))}
   {!movies.length && <div className="grid place-items-center h-screen"><Loader /></div>}
   {position && <MovieCard position={position} />}
   </>
 );
};

export default Main;