import type {Metadata} from 'next';
import Main from './Main';

export const metadata: Metadata = {
 title: "Video",
 description: "",
 keywords: "",
};

interface props {
 searchParams: {id: string};
};

const Page = ({searchParams}: props) => {
 return (
  <main className="bg-black min-h-screen">
   <Main id={searchParams.id} /> 
  </main>  
 );
};

export default Page;