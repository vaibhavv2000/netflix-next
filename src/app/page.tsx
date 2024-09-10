import type {Metadata} from 'next';
import Main from './components/Main';
import Layout from './components/Layout';

export const metadata: Metadata = {
 title: "Sign In",
 description: "Sign in to your account",
 keywords: "sign in, account, netflix, movie, tv show, streaming",
};

const Page = () => {
 return (
  <Layout>
   <Main />
  </Layout>  
 );
};

export default Page;