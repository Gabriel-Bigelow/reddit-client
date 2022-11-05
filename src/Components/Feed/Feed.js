import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Article from "../Article/Article"
import './Feed.css'


import { clearArticles, loadFeedItems, selectArticles, selectIsLoadingArticles, selectLastArticle, selectNumberOfArticlesToLoad, selectShowPage, setArticles, setShowPage} from './feedSlice';
import { clearSearchObjects, selectReturnedSearch, selectSearchTerm } from "../Searchbar/searchSlice";
import { selectSelectedSubreddit } from "../SubredditsBar/subredditsBarSlice";

export default function Feed () {
    const dispatch = useDispatch();
    const page = useSelector(selectShowPage);
    const articles = useSelector(selectArticles);
    const isLoadingArticles = useSelector(selectIsLoadingArticles);
    const returnedSearch = useSelector(selectReturnedSearch);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

    const numberOfArticlesToLoad = useSelector(selectNumberOfArticlesToLoad);
    const lastArticle = useSelector(selectLastArticle);
    const searchTerm = useSelector(selectSearchTerm);

    useEffect(() => {
        if (!page) {
            dispatch(setShowPage('all'));
        }
        if (Object.keys(returnedSearch).length > 0) {
            dispatch(clearArticles());
            dispatch(setArticles(returnedSearch));
            dispatch(clearSearchObjects());
            dispatch(setShowPage('search'));
        }
        if (page) {
            dispatch(loadFeedItems({numberOfArticlesToLoad: numberOfArticlesToLoad, lastArticle: lastArticle, subreddit: selectedSubreddit, searchTerm: searchTerm}));
        }

    }, [page, returnedSearch, numberOfArticlesToLoad, lastArticle, searchTerm, selectedSubreddit, dispatch]);

    if (isLoadingArticles && Object.keys(articles).length === 0) {
        return (
            <div id="loading-message">
                <h1>Lurking...</h1>
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