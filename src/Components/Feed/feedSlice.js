import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const loadFeedItems = createAsyncThunk(
    'feed/loadFeedItems',
    async (arg) => {
        const { numberOfArticlesToLoad, lastArticle, subreddit, searchTerm } = arg;
        const afterQuery = lastArticle ? `&after=${lastArticle}` : '';
        const numArticlesQuery = numberOfArticlesToLoad ? `limit=${numberOfArticlesToLoad}` : `limit=0`
        const subredditURL = subreddit.length > 0 ? `${subreddit}` : '/'


        let fetchURL
        if (subredditURL !== '/search/') {
            fetchURL = `https://www.reddit.com${subredditURL}.json?${numArticlesQuery}${afterQuery}`
        } else {
            fetchURL = `https://www.reddit.com${subredditURL}.json?q=${searchTerm}&${numArticlesQuery}${afterQuery}`
        }

        

        if (numberOfArticlesToLoad > 0) {
            const response = await fetch(fetchURL);
            const jsonResponse = await response.json();
            return jsonResponse.data.children;
        } else {
            return [];
        }
    }
);
export const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        articles: {},
        showPage: '',
        numberOfArticlesToLoad: 5,
        lastArticle: ''
    },
    reducers: {
        setShowPage: (state, action) => {
            state.showPage = action.payload;
        },
        clearArticles: (state, action) => {
            state.articles = {}
            state.numberOfArticlesToLoad = 0;
        },
        setArticles: (state, action) => {
            const array = action.payload;
            for(let article of Object.keys(action.payload)) {
                const { data } = array[article];
                state.articles[data.id] = array[article];
            }
            state.lastArticle = `t3_${Object.keys(state.articles)[Object.keys(state.articles).length-1]}`;
        },
        setNumberOfArticlesToLoad: (state, action) => {
            state.numberOfArticlesToLoad = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: {
        [loadFeedItems.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadFeedItems.fulfilled]: (state, action) => {
            if (action.payload.length > 0) {

                for (let article of action.payload) {
                    const { data } = article;
                    state.articles[data.id] = article;
                    state.lastArticle = `t3_${data.id}`;
                }
                state.isLoading = false;
                state.hasError = false;
                state.numberOfArticlesToLoad = 0;
                console.log(action.payload);
            }
        },
        [loadFeedItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
})


export const { setShowPage, clearArticles, setArticles, setNumberOfArticlesToLoad, setSearchTerm} = feedSlice.actions;

export const selectShowPage = (state) => state.feed.showPage;
export const SelectArticle = (id) => {
    return useSelector((state) => state.feed.articles[id]);
}
export const selectArticles = (state) => state.feed.articles;
export const selectIsLoadingArticles = (state) => state.feed.isLoading;

export const selectNumberOfArticlesToLoad = (state) => state.feed.numberOfArticlesToLoad;
export const selectLastArticle = (state) => state.feed.lastArticle;

export default feedSlice.reducer;