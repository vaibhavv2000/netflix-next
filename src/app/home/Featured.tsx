import Image from "next/image";
import {useEffect,useState} from "react";
import {GoPlus} from "react-icons/go";
import {FaPlay} from "react-icons/fa";
import {Button,Typography} from "@mui/material";
import Link from "next/link";
import {FiMinus} from "react-icons/fi";
import Navbar from "./Navbar";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import {API} from "@/lib/API";
import type {movie, position} from "@/utils/types";
import {updateWishlist} from "@/redux/userSlice";

interface props {
 handleSetPosition: (position: position | null) => void;
};

const Featured = ({handleSetPosition}: props) => {
 const [movie,setMovie] = useState<movie>();
 const [isInMyList, setIsInMyList] = useState(false);
 const {movies} = useAppSelector(state => state.movie);
 const {wishlist} = useAppSelector(state => state.user.user);

 const dispatch = useAppDispatch();

 useEffect(() => {
  setMovie(movies[Math.floor(Math.random() * movies.length)]);
 },[movies]);

 useEffect(() => {
  if(!movie) return;
  setIsInMyList(wishlist.includes(movie.id));
 }, [wishlist, movie]);

 const handleUpdateWishlist = async (option: boolean) => {
  if(!movie) return;
  dispatch(updateWishlist({id: movie.id, add: !option}));
  await API.patch(`/movie/updatewishlist?id=${movie.id}&add=${!option}`);
 };

 if(!movie) return <Navbar />;

 return (
  <div onMouseEnter={() => handleSetPosition(null)}>
   <Navbar />
   <div className="relative h-96 sm:h-[420px] md:h-[550px] lg:h-[700px] bg-no-repeat">
    <div className="absolute md:left-10 left-2 md:top-[50%] w-80 sm:w-96 z-10 translate-y-[-40%] md:translate-y-[-50%] top-[50%] xxl:scale-150 xxl:left-40">
     <img
      src={movie.title_img}
      alt={movie.movie_name}
      className="h-16 sm:h-14 md:h-40 w-60 md:w-full object-fill"
     />
     <div className="flex items-center text-lg font-medium my-2 space-x-2 text-white">
      <span>{movie.movie_name} |</span>
      <span>{movie.release_year} |</span>
      <span>{movie.genre}</span>
     </div>
     <Typography className="text-white/80 text-[12px]" sx={{my: 1}}>
      {movie.description}
     </Typography>
     <div className="flex items-center space-x-3 py-2">
      <Button
       variant="contained"
       size="large"
       startIcon={<FaPlay size={20} color={"#fff"} />}
      >
       <Link href={{pathname: "/video",query: {id: movie.id}}}>PLAY</Link>
      </Button>
      <Button
       variant="contained"
       size="large"
       // sx={{background: "#999","&:hover": {background: "#999"}}}
       sx={{backgroundColor: "#888"}}
       onClick={() => handleUpdateWishlist(isInMyList)}
       startIcon={isInMyList ? <FiMinus size={23} color={"#fff"} /> : <GoPlus size={23} color={"#fff"} />}
      >
       MY LIST
      </Button>
     </div>
    </div>
    <Image
     src={movie.thumbnail}
     alt={movie.movie_name}
     fill
     className="h-full w-full object-cover"
    />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.17777)] to-[rgba(0,0,0,0.377777)]"></div>
   </div>
  </div>
 );
};

export default Featured;