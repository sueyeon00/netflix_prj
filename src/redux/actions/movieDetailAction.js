import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id) => {
        const reviewsApi = api.get(`/movie/${id}/reviews?language=en-US&page=1`);
        const recommendationsApi = api.get(`/movie/${id}/recommendations?language=en-US&page=1`);
        const traliersApi = api.get(`/movie/${id}/videos?language=en-US`)
    
        
        let [reviews, recommendations, traliers] = await Promise.all([reviewsApi, recommendationsApi, traliersApi]);
        

        return {
            reviews: reviews.data,
            recommendations: recommendations.data,
            traliers: traliers.data,
        };
    }
);
