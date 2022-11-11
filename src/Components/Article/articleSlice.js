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
        if (jsonResponse[1].data.children.length > 0) {
            return jsonResponse[1].data.children;
        } else {
            return jsonResponse[0].data.children;
        }
    }
);

export const loadAdditionalCommentsForArticle = createAsyncThunk(
    'article/loadAdditionalCommentsForArticle',
    async (arg) => {
        const { subreddit, articleID, commentIDArray } = arg;
        const responseArray = [];

        for (let commentID of commentIDArray) {
            const response = await fetch (`https://www.reddit.com/r/${subreddit}/comments/${articleID}/comment/${commentID}/.json`);
            const jsonResponse = await response.json();
            if (await jsonResponse[1].data.children.length > 0) {
                responseArray.push(await jsonResponse[1].data.children[0].data);
            } else {
                responseArray.push(commentID);
            }
        };


        /*const jsonData = [];
        const allData = Promise.all(fetchArray)
        .then((res) => {
            Promise.all(res.map(r => r.json()))
            .then(jsonResponse => jsonResponse.map(comment => {
                if (comment[1].data.children.length > 0) {
                    return comment[1].data.children[0].data;
                }
            }))
        })*/

        return await responseArray;
    }
)

export const loadImageArrayForArticle = createAsyncThunk(
    'article/loadImageArrayForArticle',
    async (imageLink) => {
        const response = await fetch(imageLink);
        const jsonResponse = await response.json();
        return jsonResponse;
    }
);


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
        setDisplayHowManyComments: (state, action) => {
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
            if (action.payload[0].data.parent_id) {
                const commentsArray = action.payload;

                const commentsList = {};
                let howManyCommentsLoaded = 0;
                for (let comment of commentsArray) {
                    if (comment.kind === 't1') {
                        commentsList[comment.data.id] = comment.data;
                        howManyCommentsLoaded++;
                    }
                    if (comment.kind === 'more') {
                        for (let id of comment.data.children) {
                            commentsList[id] = null;
                        }
                    }
                }

                state.commentsForArticleID[action.payload[0].data.parent_id].commentsList = commentsList;
                state.commentsForArticleID[action.payload[0].data.parent_id].displayHowManyComments = 3;
                state.commentsForArticleID[action.payload[0].data.parent_id].commentsLoaded = howManyCommentsLoaded;
                state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].hasError = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].allCommentsLoaded = false;
            }
        },
        [preloadCommentsForArticle.rejected]: (state, action) => {
            state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
            state.commentsForArticleID[action.payload[0].data.parent_id].hasError = true;
        },

        [loadAllCommentsForArticle.fulfilled]: (state, action) => {
            if (action.payload[0].data.parent_id) {
                const commentsArray = action.payload;

                const commentsList = {};
                let howManyCommentsLoaded = 0;
                for (let comment of commentsArray) {
                    if (comment.kind === 't1') {
                        commentsList[comment.data.id] = comment.data;
                        howManyCommentsLoaded++;
                    }
                    if (comment.kind === 'more') {
                        for (let id of comment.data.children) {
                            commentsList[id] = null;
                        }
                    }
                }
                state.commentsForArticleID[action.payload[0].data.parent_id].commentsList = commentsList;
                state.commentsForArticleID[action.payload[0].data.parent_id].commentsLoaded = howManyCommentsLoaded;
                state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].hasError = false;
                state.commentsForArticleID[action.payload[0].data.parent_id].allCommentsLoaded = true;
            } else {
                state.commentsForArticleID[action.payload[0].data.name].comments = [action.payload[0].data.selftext];
                state.commentsForArticleID[action.payload[0].data.name].isLoading = false;
                state.commentsForArticleID[action.payload[0].data.name].hasError = false;
                state.commentsForArticleID[action.payload[0].data.name].allCommentsLoaded = true;
            }
        },
        [loadAllCommentsForArticle.rejected]: (state, action) => {
            state.commentsForArticleID[action.payload[0].data.parent_id].isLoading = false;
            state.commentsForArticleID[action.payload[0].data.parent_id].hasError = true;
        },

        [loadAdditionalCommentsForArticle.pending]: (state, action) => {
        },
        [loadAdditionalCommentsForArticle.fulfilled]: (state, action) => {
            const commentsArray = action.payload;
            const removeArray = [];
            let parentID;
            let commentsLoaded = 0;

            for (let comment in commentsArray) {
                if (typeof commentsArray[comment] === 'object') {
                    parentID = commentsArray[comment].parent_id
                    state.commentsForArticleID[parentID].commentsList[commentsArray[comment].id] = commentsArray[comment];
                } else {
                    removeArray.push(commentsArray[comment]);
                }
            }
            for (let comment of removeArray) {
                state.commentsForArticleID[parentID].commentsList[comment] = undefined;
            }
            for (let comment of Object.keys(state.commentsForArticleID[parentID].commentsList)) {
                if (state.commentsForArticleID[parentID].commentsList[comment] !== null && state.commentsForArticleID[parentID].commentsList[comment] !== undefined) {
                    commentsLoaded++
                }
            }

            state.commentsForArticleID[parentID].isLoading = false;
            state.commentsForArticleID[parentID].hasError = false;
            state.commentsForArticleID[parentID].commentsLoaded = commentsLoaded;
        },
        [loadAdditionalCommentsForArticle.rejected]: (state, action) => {
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

export const { addArticleIDForComments, setDisplayHowManyComments, clearCommentsforArticleID } = articlesSlice.actions;


export const SelectComments = (id) => {
    return useSelector((state) => state.articles.commentsForArticleID[id])
}
export const SelectCommentLimit = (id) => {
    return useSelector((state) => state.articles.commentsForArticleID[id].displayHowManyComments)
}
export const selectImages = (state) => state.articles.imagesForArticleID
export default articlesSlice.reducer;