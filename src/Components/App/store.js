import { configureStore } from "@reduxjs/toolkit";
import feedReducer from '../Feed/feedSlice';
import articlesReducer from '../Article/articleSlice';
import redditReducer from "./Reddit";

export const store = configureStore({
    reducer: {
        feed: feedReducer, 
        articles: articlesReducer,
        reddit: redditReducer
    }
});