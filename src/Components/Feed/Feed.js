import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Article from "../Article/Article"
import './Feed.css'

import { loadFeedItems, selectArticles } from './feedSlice';

export default function Feed () {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);


    useEffect(() => {
        if (articles.length === 0) {
            dispatch(loadFeedItems());
        }
    }, [articles, dispatch]);    



    return (
        <div id="articles-container">
            {/* come back to this and use .map() to populate the feed with articles */ }
            {articles.map(article => {
                const { id, subreddit, title, author, score, url } = article.data;
                return (
                    <Article key={id} articleObject={article.data} subreddit={subreddit} title={title} author={author} score={score} url={url} />
                )
            })}
        </div>
    )
}