import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encodeURL } from "../../features/formatting";

export const searchForArticles = createAsyncThunk(
    'feed/search',
    async (term) => {
        const searchTerm = encodeURL(term);
        const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`)
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        term: '',
        returnedSearch: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        setSearch: (state, action) => {
            state.term = action.payload;
        },
        clearSearchObjects: (state, action) => {
            state.returnedSearch = [];
        }
    },
    extraReducers: {
        [searchForArticles.pending]: (state, action) => {
            state.hasError = false;
            state.isLoading = true;
        },
        [searchForArticles.fulfilled]: (state, action) => {
            state.returnedSearch = action.payload.data.children;
            state.isLoading = false;
            state.hasError = false;
        },
        [searchForArticles.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
});

export const { setSearch, clearSearchObjects } = searchSlice.actions;
export const selectSearchTerm = (state) => state.search.term;
export const selectReturnedSearch = (state) => state.search.returnedSearch;
export default searchSlice.reducer;