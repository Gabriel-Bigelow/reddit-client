import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearCommentsforArticleID } from '../Article/articleSlice';
import { clearArticles, setArticles, setShowPage } from '../Feed/feedSlice';
import './SubredditsBar.css';
import { loadSubreddits, loadSubredditPage, selectSubreddits, selectReturnedSubredditData, selectSelectedSubreddit, setSelectedSubreddit, clearReturnedSubredditData } from './subredditsBarSlice';

export default function SubredditsBar () {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    const returnedSubredditData = useSelector(selectReturnedSubredditData)

    useEffect(() => {
        if (Object.keys(subreddits).length === 0) {
            dispatch(loadSubreddits());
        }
        if (Object.keys(returnedSubredditData).length > 0) {
            dispatch(clearArticles());
            dispatch(setArticles(returnedSubredditData));
            dispatch(clearReturnedSubredditData());
            dispatch(clearCommentsforArticleID());
            dispatch(setShowPage(selectedSubreddit));
            window.scrollTo(0, 0);
        }
    }, [dispatch, subreddits, returnedSubredditData, selectedSubreddit]);



    return (
        <div id='subreddits-container'>
            
            <div id="subreddits-and-shadow-holder">
                <div id='subreddits-shadow'></div>
                <div className='subreddits'>
                    <div id="subreddits-inner-container">
                        <h1 id="subreddits-header">Subreddits</h1>
                        <ul id="subreddit-links">
                            {renderSubreddits(subreddits, dispatch)}
                        </ul>
                        <h1 id="subreddits-sider">Subreddits</h1>
                    </div>
                </div>
            </div>
        </div>
    )
};

function top25Subreddits (subreddits) {
    const testArray = [];
    for (let subreddit of Object.keys(subreddits)) {
        testArray.push(subreddits[subreddit]);
    }
    const highestArray = [];
    for (let i = 0; i < 25; i++) {
        let highest = testArray[0];
        let lowest = testArray[0];
        for (let i = 0; i < testArray.length; i++) {
            if (testArray[i].subscribers > highest.subscribers) {
                highest = testArray[i];
            }
            if (testArray[i].subscribers < lowest.subscribers) {
                lowest = testArray[i];
            }
        }
        highestArray.push(testArray.splice(testArray.indexOf(highest), 1)[0]);
        testArray.splice(testArray.indexOf(lowest), 1);
    }
    return highestArray;
}

function renderSubreddits (subreddits, dispatch) {
    function handleSubredditsClick (event) {
        dispatch(loadSubredditPage(event.target.id));
        dispatch(setSelectedSubreddit(event.target.id));
    }

    let mostPopularSubreddits = [];
    if (Object.keys(subreddits).length !== 0) {
        mostPopularSubreddits = top25Subreddits(subreddits);

        return mostPopularSubreddits.map(subreddit => {
            return (
                <li key={subreddit.url.slice(0, subreddit.url.length-1)} id={subreddit.url.slice(0, subreddit.url.length-1)}>
                    <div onLoad={document.getElementById('subreddits-inner-container').style.gridTemplateRows = `45px ${(window.innerHeight*0.7/969) * window.innerHeight}px`}>
                        <NavLink className='faux-link' id={subreddit.url} onClick={handleSubredditsClick}>{subreddit.url.slice(0, subreddit.url.length-1)}</NavLink>
                        <p className="subscriber-count">{subreddit.subscribers.toLocaleString('en-us')} users</p>
                    </div>
                </li>
            )
        })
    }
}



