import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';


export const preloadCommentsForArticle = createAsyncThunk(
    'article/preloadCommentsForArticle',
    async (commentLink) => {
        const response = await fetch(`https://www.reddit.com${commentLink}.json?limit=10`);
        const jsonResponse = await response.json();
        return await jsonResponse[1].data.children;
    }
);

export const loadImageArrayForArticle = createAsyncThunk(
    'article/loadImageArrayForArticle',
    async (imageLink) => {
        const response = await fetch(imageLink);
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)


export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        commentsForArticleID: {},
        imagesForArticleID: {},
    },
    reducers: {
        addArticleIDForComments: (state, action) => {
            const payload = action.payload;
            const parentID = `t3_${payload}`
            state.commentsForArticleID = {...state.commentsForArticleID,
                [parentID]: { parentID: parentID, isLoading: true, hasError: false, displayHowManyComments: 0}
            }
        }
    },
    extraReducers: {
        [preloadCommentsForArticle.fulfilled]: (state, action) => {
            state.commentsForArticleID[action.payload[0].data.parent_id].comments = action.payload
            state.commentsForArticleID[action.payload[0].data.parent_id].displayHowManyComments = 3;
            state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
            state.commentsForArticleID[action.payload[0].data.parent_id].hasError = false;
        },
        [preloadCommentsForArticle.rejected]: (state, action) => {
            state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
            state.commentsForArticleID[action.payload[0].data.parent_id].hasError = true;
        },




        [loadImageArrayForArticle.pending]: (state, action) => {
            state.imagesLoading = true;
            state.imagesHaveError = false;
        },
        [loadImageArrayForArticle.fulfilled]: (state, action) => {
            state.imagesLoading = false;
            state.imagesHaveError = false;
        },
        [loadImageArrayForArticle.pending]: (state, action) => {
            state.imagesLoading = false;
            state.imagesHaveError = true;
        },
    }
});

export const { addArticleIDForComments } = articlesSlice.actions;


export const SelectComments = (id) => {
    return useSelector((state) => state.articles.commentsForArticleID[id])
}

export const SelectCommentLimit = (id) => {
    return useSelector((state) => state.articles.commentsForArticleID[id].displayHowManyComments)
}
export const selectImages = (state) => state.articles.imagesForArticleID
export default articlesSlice.reducer;