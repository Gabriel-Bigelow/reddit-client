import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Article from "../Article/Article"
import './Feed.css'

import { loadFeedItems, selectArticles, selectIsLoadingArticles } from './feedSlice';

export default function Feed () {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const isLoadingArticles = useSelector(selectIsLoadingArticles);

    useEffect(() => {
        if (articles.length === 0) {
            dispatch(loadFeedItems(dispatch));
        }
    }, [articles, dispatch]);    

    if (isLoadingArticles) {
        return (
            <div>
                <h1>Lurking for posts...</h1>
            </div>
        )
    }


    return (
        <div id="articles-container">
            {/* come back to this and use .map() to populate the feed with articles */ }
            {articles.map(article => {
                const { id, subreddit, title, author, selftext, score, url } = article.data;
                return (
                    <Article key={id} articleData={article.data} type={article.data.post_hint} subreddit={subreddit} title={title} author={author} body={selftext} score={score} url={url} />
                )
            })}
        </div>
    )
}