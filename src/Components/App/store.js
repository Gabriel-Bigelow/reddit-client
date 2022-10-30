import { configureStore } from "@reduxjs/toolkit";
import feedReducer from '../Feed/feedSlice';
import articlesReducer from '../Article/articleSlice';

export const store = configureStore({
    reducer: {
        feed: feedReducer, 
        articles: articlesReducer,
    }
});