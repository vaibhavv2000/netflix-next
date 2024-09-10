import type {Metadata} from "next";
import Main from "./components/Main";
import Layout from "../components/Layout";

export const metadata: Metadata = {
 title: "Sign Up",
 description: "Create a new Account",
 keywords: "sign up, register, account, netflix, movie, tv show, streaming",
}

const Page = () => {
 return (
  <Layout>
   <Main />
  </Layout>  
 );
};
 
export default Page;