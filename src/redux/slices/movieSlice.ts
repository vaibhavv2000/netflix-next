import {createSlice} from "@reduxjs/toolkit";

interface movie {
  description: string;
  genre: string;
  id: number;
  length: number;
  movie_name: string;
  pg: boolean;
  rating: number;
  release_year: number;
  thumbnail: string;
  title_img: string;
  type: string;
};

interface state {
 moviesList: movie[];
 myList: movie[];
 position: {
  x: number;
  y: number;
 };
 isHovered: boolean;
 hoveredMovie: movie | null;
}

const initialState: state = {
 moviesList: [],
 myList: [],
 isHovered: false,
 position: {x: 0,y: 0},
 hoveredMovie: null,
}

export const movieSlice = createSlice({
 name: "movie",
 initialState,
 reducers: {
  addMovies: (state,action) => {
   state.moviesList = action.payload;
  },
  addMyList: (state,action) => {
   state.myList = action.payload;
  },
  addMovieToMyList: (state,action) => {
   state.myList = [...state.myList,action.payload];
  },
  removeMovie: (state,action) => {
   state.myList = state.myList.filter((m) => m.id !== action.payload)
  },
  movieHovered: (state,action) => {
   state.isHovered = true;
   state.position = {x: action.payload.x,y: action.payload.y};
   state.hoveredMovie = action.payload.movie;
  },
  movieUnhovered: (state) => {
   state.isHovered = false;
   state.hoveredMovie = null
  },
  emptyMyList: (state) => {
   state.myList = [];
  }
 }
});

export const {addMovieToMyList,addMovies,addMyList,movieHovered,movieUnhovered,removeMovie, emptyMyList} = movieSlice.actions;

export default movieSlice.reducer;