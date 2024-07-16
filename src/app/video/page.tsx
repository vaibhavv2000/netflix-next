import Main from './Main'

interface props {
 searchParams: {id: string};
}

const Page = ({searchParams}: props) => {
 return (
  <main>
   <Main id={searchParams.id} />
  </main>
 );
};

export default Page;