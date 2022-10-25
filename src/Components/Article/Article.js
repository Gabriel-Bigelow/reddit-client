import './Article.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectArticle, loadArticle } from './articleSlice';
import { useEffect } from 'react';

function formatTime (time) {
    if (time[0] < 60 ) {
        time[4] = time[0].toFixed(0);
        time[5] = 'seconds'
    } else if (time[1] < 60) {
        time[4] = time[1].toFixed(0);
        time[5] = time.minutes < 2 ? "minute" : "minutes";
    } else if (time[2] < 24) {
        time[4] = time[2].toFixed(0);
        time[5] = time.hours < 2 ? "hour" : "hours";
    } else if (time[3] < 30) {
        time[4] = time[3].toFixed(0);
        time[5] = time.days < 2 ? "day" : "days";
    }
}

function renderMedia (type, articleData) {
    if (!type && articleData.selftext) {
        return (
            <p className='article-text'>{articleData.selftext}</p>
        )
    } else if (type === "link") {
        return
    } else if (type === "image") {
        return (
            <img src={articleData.url} />
        )
    } else if (type === "hosted:video") {
        return (
            <video controls>
                <source src={articleData.media.reddit_video.fallback_url} type="video/mp4" />
            </video>
        )
    } else if (type === "rich:video") {
        return
    }
}

export default function Article ({articleData, type, subreddit, title, score, author}) {
    const dispatch = useDispatch();
    const article = useSelector(selectArticle);
    const votes = score >= 1000? `${(score / 1000).toFixed(1)}k` : score;


    const timeRightNow = Date.now();
    const timeSincePost = [
        (timeRightNow / 1000).toFixed(0) - articleData.created,
        ((timeRightNow / 1000).toFixed(0) - articleData.created)/60,
        (((timeRightNow / 1000).toFixed(0) - articleData.created)/60)/60,
        (((timeRightNow / 1000).toFixed(0) - articleData.created)/60)/60/24
    ]
    formatTime(timeSincePost);

    //if the article TITLE begins with a question, the first several comments should be loaded into the body.

    return (
        <div className="article">
            <div className="article-inner-container">
                <div className='article-subheader'><h4><NavLink>r/{subreddit}</NavLink> by u/{author} {/* grab data here for time*/} {timeSincePost[4]} {timeSincePost[5]} ago </h4></div>
                
                <div className="article-header">
                    <h2 className='no-margin'>{title}</h2>
                </div>

                
                <div className="article-body">
                    {renderMedia(type, articleData)}
                </div>

                <div className="article-actions">
                        <p className='no-margin votes'>^ {votes} v</p>
                        <p className='no-margin comments'>182 Comments</p>
                </div>
            </div>
        </div>
    )
}