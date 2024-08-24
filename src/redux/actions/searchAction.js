import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchSearch = createAsyncThunk(
    'search/fetchSearchs',
    async (query, { rejectWithValue }) => {
      try {
        // 검색어를 포함하여 API 요청을 보냅니다.
        const response = await api.get('/search/movie', {
          params: {
            query: query,  // 검색어
            include_adult: false,
            language: 'en-US',
            page: 1
          }
        });
        
        // API 응답을 반환
        return response.data.results;

       
      } catch (error) {
        // 에러 발생 시 rejectWithValue로 에러 정보를 반환
        return rejectWithValue(error.response.data);
      }
    }
  );