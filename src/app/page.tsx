import {Metadata} from 'next';
import Main from './components/Main';

export const metadata: Metadata = {
  title: "Sign In"
}

const Page = () => {
  return (
    <>
      <Main />
    </>
  )
}

export default Page