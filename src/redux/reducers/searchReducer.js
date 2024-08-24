import { createSlice } from "@reduxjs/toolkit";
import { fetchSearch } from "../actions/searchAction";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
      loading: false,
      searchResults: [],
      error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to search movies';
      });
    }
});
export default searchSlice.reducer;