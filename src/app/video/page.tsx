import Main from './Main'

interface props {
 searchParams: {id: string};
};

const Page = ({searchParams}: props) => <Main id={searchParams.id} />;

export default Page;