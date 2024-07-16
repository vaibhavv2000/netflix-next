"use client";

import {useEffect,useState} from "react";
import {movie} from "../home/Featured";
import {Typography} from "@mui/material";
import {IoMdTime} from "react-icons/io";
import {AiFillStar,AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import {API} from "@/lib/API";
import {RxCalendar} from "react-icons/rx";
import {FaPlay} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import {useRouter} from "next/navigation";
import Recommendations from "./Recommendations";
import {addMovieToMyList, removeMovie} from "@/redux/slices/movieSlice";

const Video = ({id}: {id: string}) => {
 const [movie,setMovie] = useState<movie>();
 const [isInList,setIsInList] = useState<boolean>(false);
 const [play,setPlay] = useState<boolean>(false);
 const [randomMovies,setRandomMovies] = useState<movie[]>([]);

 const {push} = useRouter();

 const {myList,moviesList} = useAppSelector(state => state.movie);
 const email = useAppSelector(state => state.user.user?.email);

 if(!id || !email) push("/home");

 const dispatch = useAppDispatch();

 useEffect(() => {
  const isMovie = [...myList].find((m) => String(m.id) === String(id));

  if(isMovie) setIsInList(true);
  else setIsInList(false);
  setPlay(false);

  const getMovie = [...moviesList].find((m) => String(m.id) === String(id));

  setMovie(getMovie);
  
  const rM = [...moviesList]
   .filter((m) => String(m.id) !== String(id))
   .sort((a,b) => Math.random() - 0.5)
   .slice(0,5);

  setRandomMovies(rM);

  document.title = `Movie - ${getMovie?.movie_name}`;
 }, [myList, moviesList, id]);

 const handleMovie = async (like: boolean,id: number) => {
  const movieId = id;

  try {
   if(!like) { 
    dispatch(removeMovie(id));
    setIsInList(false);
    await API.post("/movie/removefromwishlist",{email,movieId});
   } else {
    dispatch(addMovieToMyList(movie));
    setIsInList(true);
    await API.post("/movie/addtowishlist",{email,movieId});
   }
  } catch(error: any) {
   console.log("Error",error.response.data);
  }
 };

 return (
  <div className="bg-black min-h-screen">
   <div className="h-80 md:h-[500px] lg:h-[700px]">
    {play ? (
     <video src="https://player.vimeo.com/external/325310326.sd.mp4?s=b2285047311c7d6d8cc2bfc0c62704563b630c65&profile_id=164&oauth2_token_id=57447761" autoPlay controls className="w-full h-full"></video>
    ) : (
     <div
      style={{
       backgroundImage: `url(${movie?.thumbnail})`,
       backgroundSize: "cover",
       backgroundRepeat: "no-repeat",
      }}
      className="w-full h-full grid place-items-center"
     >
      <div className="grid place-items-center bg-[rgba(0,0,0,0.5)] rounded-full h-16 w-16 md:h-24 md:w-24">
       <FaPlay
        color="#fff"
        size={30}
        className="cursor-pointer shadow-2xl"
        onClick={() => setPlay(true)}
       />
      </div>
     </div>
    )}
   </div>
   <div className="p-5 flex flex-col space-y-2">
    <div className="flex items-center space-x-5">
     <Typography className="text-white" variant="h6">
      {movie?.movie_name}
     </Typography>
     <span className="cursor-pointer">
     {isInList ? (
      <AiFillHeart
       size={24}
       color="red"
       onClick={() => movie && handleMovie(false,movie.id)}
      />
      ) : (
      <AiOutlineHeart
       size={24}
       color="white"
       onClick={() => movie && handleMovie(true,movie.id)}
       />
      )}
     </span>
    </div>
    <div className="flex items-center space-x-5 my-1.5">
     <div className="flex items-center space-x-1">
      <AiFillStar size={24} color="gold" />
      <Typography className="text-white" variant="body1">
       {movie?.rating}
      </Typography>
     </div>
     <div className="flex items-center flex-1 space-x-1">
      <IoMdTime size={24} color="#fff" />
      <Typography variant="body2" className="text-white">
       {movie?.length}
      </Typography>
     </div>
    </div>
    <div className="flex items-center space-x-5 my-1.5">
     <div className="flex items-center space-x-2">
      <RxCalendar size={24} color="#fff" />
      <Typography className="text-white" variant="body2">
       {movie?.release_year}
      </Typography>
     </div>
     <div className="flex items-center flex-1 space-x-1">
      <Typography
       variant="body2"
       className="text-white font-bold capitalize"
      >
       {movie?.genre}
      </Typography>
     </div>
    </div>
    <Typography variant="body1" className="text-white/70">
     {movie?.description}
    </Typography>
   </div>
   {/*  */}
   <div className="p-5 flex flex-col space-y-4">
    <Typography className="text-white" variant="h4" sx={{mb: 2}}>
     Recommendations For You
    </Typography>
    <Recommendations randomMovies={randomMovies} />
   </div>
  </div>
 );
};

export default Video;