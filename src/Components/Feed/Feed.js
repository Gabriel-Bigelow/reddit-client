import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Article from "../Article/Article"
import './Feed.css'
import { selectImages, selectTest } from '../Article/articleSlice';


import { loadFeedItems, selectArticles, selectIsLoadingArticles} from './feedSlice';
import { changeSomethingHere, selectSomethingHere } from "../Reddit/redditSlice";

export default function Feed () {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const isLoadingArticles = useSelector(selectIsLoadingArticles);

    useEffect(() => {
        if(Object.keys(articles).length === 0) {
            dispatch(loadFeedItems());
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
            { Object.keys(articles).map(article => {
                return <Article key={article} articleData={articles[article].data}  />
            })}
        </div>
    )
}