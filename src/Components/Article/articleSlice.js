import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const preloadCommentsForArticle = createAsyncThunk(
    'feed/loadCommentsForArticlePreview',
    async (commentLink) => {
        const response = await fetch(`https://www.reddit.com${commentLink}.json`);
        const jsonResponse = await response.json();
        return jsonResponse[1].data.children.slice(0, 3);
    }
)

export const articleSlice = createSlice({
    name: 'article',
    initialState: {
        commentsForArticleID: {}
    },
    reducers: {
        addArticleIDForComments: (state, action) => {
            const parentID = `t3_${action.payload.id}`;
            state.commentsForArticleID = {...state, parentID}
        }
    },
    extraReducers: {
        [preloadCommentsForArticle.pending]: (state, action) => {
            state.commentsLoading = true;
            state.commentsHaveError = false;
        },
        [preloadCommentsForArticle.fulfilled]: (state, action) => {
            state.commentsForArticleID[action.payload[0].data.parent_id] = action.payload;
            state.commentsLoading = false;
            state.commentsHaveError = false;
        },
        [preloadCommentsForArticle.rejected]: (state, action) => {
            state.commentsLoading = false;
            state.commentsHaveError = true;
        },
    }
});

export const { addArticleIDForComments } = articleSlice.actions;

export const selectArticle = (state) => state.article;
export const selectComments = (state) => state.article.commentsForArticleID;
export default articleSlice.reducer;