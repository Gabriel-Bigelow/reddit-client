import { configureStore } from "@reduxjs/toolkit";
import feedReducer from '../Feed/feedSlice';
import articlesReducer from '../Article/articleSlice';
import searchReducer from '../Searchbar/searchSlice';
import subredditsBarReducer from '../SubredditsBar/subredditsBarSlice';

export const store = configureStore({
    reducer: {
        feed: feedReducer,
        subredditsBar: subredditsBarReducer,
        articles: articlesReducer,
        search: searchReducer
    }
});