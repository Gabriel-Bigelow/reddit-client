import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const preloadCommentsForArticle = createAsyncThunk(
    'article/preloadCommentsForArticle',
    async (commentLink) => {
        const response = await fetch(`https://www.reddit.com${commentLink}.json`);
        const jsonResponse = await response.json();
        return jsonResponse[1].data.children.slice(0, 3);
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
        imagesForArticleID: {}
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




        [loadImageArrayForArticle.pending]: (state, action) => {
            state.imagesLoading = true;
            state.imagesHaveError = false;
        },
        [loadImageArrayForArticle.fulfilled]: (state, action) => {
            console.log(action.payload);
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

export const selectArticle = (state) => state.articles;
export const selectComments = (state) => state.articles.commentsForArticleID;
export const selectImages = (state) => state.articles.imagesForArticleID
export default articlesSlice.reducer;