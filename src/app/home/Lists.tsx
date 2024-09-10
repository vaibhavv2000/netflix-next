import {useState,useEffect,memo,useRef} from "react";
import ListMovie from "./ListMovie";
import {SlArrowLeft,SlArrowRight} from "react-icons/sl";
import {Typography} from "@mui/material";
import {useAppSelector} from "@/lib/redux";
import type {movie, position} from "@/utils/types";

interface props {
 title: string;
 handleSetPosition: (position: position  | null) => void;
}

const Lists = (props: props) => {
 const {title, handleSetPosition} = props;
 const [list, setList] = useState<movie[]>([]);
 const [slideNum, setSlideNum] = useState<number>(0);

 const moviesRef = useRef<HTMLDivElement>(null);
 const {movies} = useAppSelector(state => state.movie);
 const {wishlist} = useAppSelector(state => state.user.user);

 const slide = (option: "left" | "right") => {
  const {width} = moviesRef.current?.getBoundingClientRect() as DOMRect;

  if(option === "left" && slideNum > 0) setSlideNum(prev => prev - 200);
  if(option === "right" && slideNum < width + 300) setSlideNum(prev => prev + 200);
 };

 useEffect(() => {
  if(title !== "My List") setList([...movies].sort(() => Math.random() - 0.5));
 }, [movies]);

 useEffect(() => {
  if(title === "My List") {
   let list = movies.filter(item => wishlist.includes(item.id));
   setList(list); 
  };
 }, [wishlist, movies]);

 return (
  <div className="p-3 transition-all" onMouseEnter={() => handleSetPosition(null)}>
   <Typography variant="h6" className="text-white" sx={{my: 1}}>
    {title}
   </Typography>
   <div ref={moviesRef} className="overflow-x-scroll md:overflow-x-hidden relative">
    {movies.length > 3 && (
     <div className={`arrow left-0`}>
      <SlArrowLeft
       size={40}
       color="#fff"
       className="cursor-pointer z-[9999999]"
       onClick={() => slide("left")}
      />
     </div>
    )}
    <div
     className="w-max flex items-center space-x-3 md:space-x-2"
     style={{transform: `translateX(${-slideNum}px)`}}
     onBlur={() => handleSetPosition(null)}
    >
     {!list.length && <div>
      <h1 className="text-red-600 font-medium text-3xl">List Empty</h1>
      </div>}
     {list.length > 0 && list.map((movie) => (
      <ListMovie key={`${movie.id}-movie`} movie={movie} handleSetPosition={handleSetPosition} />
     ))}
    </div>
    {movies.length > 3 && (
     <div className={`arrow right-0`}>
      <SlArrowRight
       size={40}
       color="#fff"
       className="cursor-pointer z-[999999999999]"
       onClick={() => slide("right")}
      />
     </div>
    )}
   </div>
   <style jsx>
    {`
     * { transition: all 0.2s ease-in; }
    `}
   </style>
  </div>
 ); 
};

export default memo(Lists);