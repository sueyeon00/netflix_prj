import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const popularApi = api.get('/movie/popular?language=en-US&page=1');
    const topRateApi = api.get('/movie/top_rated?language=en-US&page=1');
    const upComingApi = api.get('/movie/upcoming?language=en-US&page=1');
    const genreApi = api.get('/genre/movie/list?language=en');

    let [popularMovies, topRateMovies, upComingMovies, genreList] = await Promise.all([popularApi, topRateApi, upComingApi, genreApi]);


    return {
      popularMovies: popularMovies.data,
      topRateMovies: topRateMovies.data,
      upComingMovies: upComingMovies.data,
      genreList: genreList.data.genres,
    };
  }
);
