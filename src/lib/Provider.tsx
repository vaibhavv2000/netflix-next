'use client';

import {login} from '@/redux/userSlice';
import {type ReactNode,useEffect,useRef} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {useAppDispatch} from './redux';
import {type AppStore, makeStore} from './store';
import {API} from './API';
import {useRouter} from 'next/navigation';

interface props {
 children: ReactNode;
};

function Provider({children}:props) {
 const storeRef = useRef<AppStore>()
 if(!storeRef.current) storeRef.current = makeStore();
 
 return (
  <ReduxProvider store={storeRef.current}>
   <Child>
    {children}
   </Child>
  </ReduxProvider>
 );
};

export default Provider;

const Child = ({children}: {children: ReactNode}) => {
 const dispatch = useAppDispatch();
 const {push} = useRouter();

 useEffect(() => {
  const checkAuth = async () => {
   const auth = localStorage.getItem("netflix-auth");
   if(!auth) return;

   try {
    const res = await API.get("/auth/checkauth");
    dispatch(login(res.data));
    push("/home");
   } catch (error) {
    localStorage.removeItem("netflix-auth");
    push("/");
   };
  };

  checkAuth();
 }, []);

 return children;
};