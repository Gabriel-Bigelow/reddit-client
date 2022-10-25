import { configureStore } from "@reduxjs/toolkit";
import feedReducer from '../Feed/feedSlice';
import articleReducer from '../Article/articleSlice';

export const store = configureStore({
    reducer: {
        feed: feedReducer, 
        article: articleReducer
    }
});