import {Metadata} from 'next';
import Main from './Main';

export const metadata: Metadata = {
 title: "Home",
 description: "Search movies or find the best films across different genres",
 keywords: "movies, search, genres, best films, movie collection, movie discovery"
};

const page = () => {
 return (
  <main className="bg-black" style={{maxWidth: "2350px",margin: "auto"}}>
   <Main /> 
  </main>  
 );   
};

export default page;