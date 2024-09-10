import {Metadata} from 'next';
import Main from './Main';

export const metadata: Metadata = {
 title: "Home"
};

const page = () => {
 return (
  <main className="bg-black" style={{maxWidth: "2350px",margin: "auto"}}>
   <Main /> 
  </main>  
 );   
};

export default page;