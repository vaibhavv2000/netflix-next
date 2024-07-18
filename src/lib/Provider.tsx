'use client';

import {login} from '@/redux/slices/userSlice';
import {AppStore, makeStore} from '@/redux/store';
import {ReactNode,useEffect,useRef} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {useAppDispatch} from './redux';

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

 useEffect(() => {
  const user = localStorage.getItem("netflix-user");
  if(user) dispatch(login(JSON.parse(user)));
 },[]);

 return children;
}