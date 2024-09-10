import {MouseEvent,memo,useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import type {movie, position} from "@/utils/types";

interface props {
 movie: movie;
 handleSetPosition: (position: position | null) => void;
};

const ListMovie = (props: props) => {
 const {movie, handleSetPosition} = props;

 const movieRef = useRef<HTMLDivElement>(null);

 function mouseHovered(event: MouseEvent<HTMLDivElement>) {
  let top: number = 0;
  event.stopPropagation();

  window.addEventListener("mouseover",function getPos(e: any) {
   top = e.target.offsettTop
  });

  handleSetPosition({x: event.clientX,y: top,movie});
 };

 return (
  <div 
   ref={movieRef} 
   onMouseEnter={mouseHovered} 
   className={`h-60 w-40 md:h-40 md:w-[270px] rounded-md hover:opacity-60 cursor-pointer relative`}
  >
   <Link className="h-full w-full" href={{pathname: "/video",query: {id: movie.id}}}>
    <Image
     src={movie.thumbnail}
     className="h-full w-full rounded-md object-cover"
     alt={movie.movie_name}
     fill
    />
   </Link>
  </div>
 );
};

export default memo(ListMovie);