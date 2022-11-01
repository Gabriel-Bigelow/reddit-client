import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Article from "../Article/Article"
import './Feed.css'


import { loadHomePage, selectArticles, selectIsLoadingArticles, selectShowPage, setArticles, setShowPage} from './feedSlice';
import { clearSearchObjects, selectReturnedSearch } from "../Searchbar/searchSlice";

export default function Feed () {
    const dispatch = useDispatch();
    const page = useSelector(selectShowPage);
    const articles = useSelector(selectArticles);
    const isLoadingArticles = useSelector(selectIsLoadingArticles);
    const returnedSearch = useSelector(selectReturnedSearch);


    useEffect(() => {
        if(Object.keys(articles).length === 0 || !page) {
            dispatch(loadHomePage());
            dispatch(setShowPage('all'));
        }
        if (returnedSearch.length > 0) {
            dispatch(setArticles(returnedSearch));
            dispatch(clearSearchObjects());
            dispatch(setShowPage('search'));
        }
    }, [page, returnedSearch]);



    if (isLoadingArticles) {
        return (
            <div id="loading-message">
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