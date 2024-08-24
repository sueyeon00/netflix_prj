import { createSlice } from "@reduxjs/toolkit";
import {fetchMovies} from "./../actions/movieAction";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    topRateMovies: [],
    upComingMovies: [],
    genreList: [],
    loading: true,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload.popularMovies;
        state.topRateMovies = action.payload.topRateMovies;
        state.upComingMovies = action.payload.upComingMovies;
        state.genreList = action.payload.genreList;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
