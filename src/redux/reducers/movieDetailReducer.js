import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../actions/movieDetailAction";

const movieDetailSlice = createSlice({
    name:"movieDetails",
    initialState: {
        movieDetails: null,
        reviews: [],
        recommendations: [],
        traliers:[],
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload.movieDetails;
        state.reviews = action.payload.reviews;
        state.recommendations = action.payload.recommendations;
        state.traliers = action.payload.traliers;
        state.loading = false;
        })
        .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        });
    },
});
export default movieDetailSlice.reducer;