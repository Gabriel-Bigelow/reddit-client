import { createSlice } from "@reduxjs/toolkit";




export const articleSlice = createSlice({
    name: 'article',
    initialState: {
    },
    reducers: {
        loadArticle: (state, action) => {
            console.log(action.payload)
            state.data = action.payload;
        }
    },
    extraReducers: {
    }
});

export const { loadArticle } = articleSlice.actions;
export const selectArticle = (state) => state.article;
export default articleSlice.reducer;