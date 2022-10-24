import { createSlice } from "@reduxjs/toolkit";




export const articleSlice = createSlice({
    name: 'article',
    initialState: {
        subreddit: undefined,
        title: undefined,
        score: undefined,
        url: undefined
    },
    reducers: {

    },
    extraReducers: {
    }
});

export const selectArticle = (state) => state.article;
export default articleSlice.reducer;