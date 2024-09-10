import {memo} from "react";
import Link from "next/link";
import {Typography} from "@mui/material";
import type {movie} from "@/utils/types";

interface props {
 suggestions: movie[];
};
  
const Recommendations = ({suggestions}: props) => {
 return (
  <div>
   {suggestions.map((movie) => (
   <Link href={{ pathname: "/video", query: {id: movie.id},}} key={`suggestion-${movie.id}`}>
    <div className="flex bg-[#121212] rounded-md gap-2 sm:bg-black items-center sm:items-start flex-col sm:flex-row space-x-4 my-4 hover:bg-[#0f0f0f] overflow-hidden sm:rounded-none">
     <img
      src={movie.thumbnail}
      alt={movie.movie_name}
      className="h-32 w-full sm:h-14 sm:w-14 md:h-20 md:w-20 object-cover"
     />
     <div className="p-2 sm:p-0">
      <Typography className="text-white" variant="h6">
       {movie.movie_name}
      </Typography>
      <Typography className="text-white/80 sm:text-left" variant="body2">
       {movie.description}
      </Typography>
     </div>
    </div>
   </Link>
  ))}
  </div>
 );
};

export default memo(Recommendations);