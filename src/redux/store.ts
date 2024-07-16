import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import movieSlice from './slices/movieSlice';

export const makeStore = () => {
 return configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice
  }
 });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];