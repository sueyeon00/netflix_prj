import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieReducer'
import movieDetailReducer from './reducers/movieDetailReducer';
import searchReducer from './reducers/searchReducer';

const store = configureStore({
  reducer: { 
    movies: movieReducer,
    movieDetails : movieDetailReducer,
    search : searchReducer,
  }
}) 

export default store;