import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const loadHomePage = createAsyncThunk(
    'feed/loadHomePage',
    async (loadNumberOfArticles) => {
        const response = await fetch(`https://www.reddit.com/.json?limit=${loadNumberOfArticles}`);
        const jsonResponse = await response.json();
        return jsonResponse.data.children;
    }
);
export const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        articles: {},
        showPage: '',
        numberOfArticlesToLoad: 5
    },
    reducers: {
        setShowPage: (state, action) => {
            state.showPage = action.payload;
        },
        clearArticles: (state, action) => {
            state.articles = {}
        },
        setArticles: (state, action) => {
            const array = action.payload;
            for(let article of Object.keys(action.payload)) {
                const { data } = array[article];
                state.articles[data.id] = array[article];
            }
        },
        setNumberOfArticlesToLoad: (state, action) => {
            state.numberOfArticlesToLoad = action.payload;
        },

    },
    extraReducers: {
        [loadHomePage.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadHomePage.fulfilled]: (state, action) => {
            for (let article of action.payload) {
                const { data } = article;
                if (!state.articles[data.id]) {
                    state.articles[data.id] = article;
                }   
            }
            state.isLoading = false;
            state.hasError = false;
        },
        [loadHomePage.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
})


export const { setShowPage, clearArticles, setArticles, setNumberOfArticlesToLoad } = feedSlice.actions;

export const selectShowPage = (state) => state.feed.showPage;
export const SelectArticle = (id) => {
    return useSelector((state) => state.feed.articles[id]);
}
export const selectArticles = (state) => state.feed.articles;
export const selectIsLoadingArticles = (state) => state.feed.isLoading;

export const selectNumberOfArticlesToLoad = (state) => state.feed.numberOfArticlesToLoad;

export default feedSlice.reducer;