import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';


export const preloadCommentsForArticle = createAsyncThunk(
    'article/preloadCommentsForArticle',
    async (commentLink) => {
        const response = await fetch(`https://www.reddit.com${commentLink}.json?limit=10`);
        const jsonResponse = await response.json();
        if (jsonResponse[1].data.children.length > 0) {
            return jsonResponse[1].data.children;
        } else {
            return jsonResponse[0].data.children;
        }
    }
);

export const loadAllCommentsForArticle = createAsyncThunk(
    'article/loadAllCommentsForArticle',
    async (commentLink) => {
        const response = await fetch(`https://www.reddit.com${commentLink}.json`);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse[1].data.children.length > 0) {
            return jsonResponse[1].data.children;
        } else {
            return jsonResponse[0].data.children;
        }
    }
)

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
                [parentID]: { parentID: parentID, isLoading: true, hasError: false, displayHowManyComments: 0, allCommentsLoaded: false}
            }
        },
        changeDisplayHowManyComments: (state, action) => {
            const { displayHowManyComments, comments } = action.payload;
            
            state.commentsForArticleID[comments.parentID] = {...comments, 
                displayHowManyComments: displayHowManyComments
            }
        },
        clearCommentsforArticleID: (state, action) => {
            state.commentsForArticleID = {};
        }
    },
    extraReducers: {
        [preloadCommentsForArticle.fulfilled]: (state, action) => {
            const commentsForArticleIDcomments = {

            }

            if (action.payload[0].data.parent_id) {
                state.commentsForArticleID[action.payload[0].data.parent_id].comments = action.payload
                state.commentsForArticleID[action.payload[0].data.parent_id].displayHowManyComments = 3;
                state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].hasError = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].allCommentsLoaded = false;
            } else {
                state.commentsForArticleID[action.payload[0].data.name].comments = [action.payload[0].data.selftext];
                state.commentsForArticleID[action.payload[0].data.name].displayHowManyComments = 3;
                state.commentsForArticleID[action.payload[0].data.name].isLoading = false;
                state.commentsForArticleID[action.payload[0].data.name].hasError = false;
                state.commentsForArticleID[action.payload[0].data.name].allCommentsLoaded = false;
            }
        },
        [preloadCommentsForArticle.rejected]: (state, action) => {
            state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
            state.commentsForArticleID[action.payload[0].data.parent_id].hasError = true;
        },

        [loadAllCommentsForArticle.fulfilled]: (state, action) => {
            if (action.payload[0].data.parent_id) {
                console.log(action.payload);
                state.commentsForArticleID[action.payload[0].data.parent_id].comments = action.payload
                state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].hasError = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].allCommentsLoaded = true;
            } else {
                console.log(action.payload);
                state.commentsForArticleID[action.payload[0].data.name].comments = [action.payload[0].data.selftext];
                state.commentsForArticleID[action.payload[0].data.name].isLoading = false;
                state.commentsForArticleID[action.payload[0].data.name].hasError = false;
                state.commentsForArticleID[action.payload[0].data.name].allCommentsLoaded = true;
            }
            /*
            state.commentsForArticleID[action.payload[0].data.parent_id].comments = action.payload
            state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
            state.commentsForArticleID[action.payload[0].data.parent_id].hasError = false;
            state.commentsForArticleID[action.payload[0].data.parent_id].allCommentsLoaded = true;*/
        },
        [loadAllCommentsForArticle.rejected]: (state, action) => {
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

export const { addArticleIDForComments, changeDisplayHowManyComments, clearCommentsforArticleID } = articlesSlice.actions;


export const SelectComments = (id) => {
    return useSelector((state) => state.articles.commentsForArticleID[id])
}
export const SelectCommentLimit = (id) => {
    return useSelector((state) => state.articles.commentsForArticleID[id].displayHowManyComments)
}
export const selectImages = (state) => state.articles.imagesForArticleID
export default articlesSlice.reducer;