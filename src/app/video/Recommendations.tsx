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
    <Link href={{ pathname: "/video", query: {id: m.id},}} key={String(m.id)}>
     <div className="flex items-start space-x-4 my-4 hover:bg-[rgba(255,255,255,0.1)]">
      <img
       src={m.thumbnail}
       alt={m.movie_name}
       className="h-14 w-14 md:h-20 md:w-20 object-cover"
      />
      <div className="">
       <Typography className="text-white" variant="h6">
        {m.movie_name}
       </Typography>
       <Typography className="text-white/80" variant="body2">
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