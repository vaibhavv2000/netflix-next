import {Metadata} from 'next';
import Main from './Main';

export const metadata: Metadata = {
 title: "Home"
};

const page = () => <Main />;

export default page;