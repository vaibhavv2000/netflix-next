import {memo} from "react";
import {movie} from "../home/Featured";
import Link from "next/link";
import {Typography} from "@mui/material";

interface props {
 randomMovies: movie[];
};
  
const Recommendations = ({randomMovies}: props) => {
 return (
  <div>
   {randomMovies.map((m) => (
    <Link href={{ pathname: "/video", query: {id: m.id},}} key={`rm-${m.id}`}>
     <div className="flex bg-[#121212] rounded-md gap-2 sm:bg-black items-center sm:items-start flex-col sm:flex-row space-x-4 my-4 hover:bg-[#0f0f0f] overflow-hidden sm:rounded-none">
      <img
       src={m.thumbnail}
       alt={m.movie_name}
       className="h-32 w-full sm:h-14 sm:w-14 md:h-20 md:w-20 object-cover"
      />
      <div className="p-2 sm:p-0">
       <Typography className="text-white" variant="h6">
        {m.movie_name}
       </Typography>
       <Typography className="text-white/80 sm:text-left" variant="body2">
        {m.description}
       </Typography>
      </div>
     </div>
    </Link>
   ))}
  </div>
 );
};

export default memo(Recommendations);