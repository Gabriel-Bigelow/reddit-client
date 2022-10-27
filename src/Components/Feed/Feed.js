import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Article from "../Article/Article"
import { loadImageArrayForArticle, preloadCommentsForArticle, selectComments } from "../Article/articleSlice";
import './Feed.css'

import { loadFeedItems, selectArticles, selectIsLoadingArticles} from './feedSlice';

export default function Feed () {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const comments = useSelector(selectComments);
    const isLoadingArticles = useSelector(selectIsLoadingArticles);
    

    useEffect(() => {
        if (articles.length === 0) {
            dispatch(loadFeedItems(dispatch));
        }
        if (!isLoadingArticles && articles.length > 0) {
            console.log(articles);
            for (let article of articles) {
                if(article.data.post_hint === 'link' || !article.data.post_hint) {
                    dispatch(preloadCommentsForArticle(article.data.permalink))
                }
            }
        }
    }, [articles]);



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
                const { id } = article.data;
                return (
                    <Article key={id} articleData={article.data} comments={comments[`t3_${article.data.id}`]}  />
                )
            })}
        </div>
    )
}