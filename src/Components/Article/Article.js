import './Article.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectComments } from './articleSlice';
import { useEffect } from 'react';
import voteArrow from './voteArrow.svg';

function formatTime (time, timeRightNow) {
    let timeToFormat = timeRightNow/1000 - time;

    if (timeToFormat < 60) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "second" : "seconds"];
    }
    
    //seconds to minutes
    timeToFormat /= 60;
    if (timeToFormat < 60) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "minute" : "minutes"];
    }

    //minutes to hours
    timeToFormat /= 60;
    if (timeToFormat < 24) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "hour" : "hours"];
    }

    //hours to days
    timeToFormat /= 24;
    if (timeToFormat < 30) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "day" : "days"];
    }

    //days to months
    timeToFormat /= 30;
    if (timeToFormat < 12) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "month" : "months"];
    }

    //months to years
    timeToFormat /= 12;
    return [timeToFormat.toFixed(0), timeToFormat < 2 ? "year" : "years"];
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

function renderComments (comments, timeRightNow) {
    if (comments) {
        return comments.map(({data}) => {
            console.log(data)
            const timeSinceComment = formatTime(data.created, timeRightNow)
            return (
                <div className='comment-container'>
                    <div className='comment-info'>
                        <h5 className='inline-block'>{data.author}</h5>
                        <h6 className='inline-block'>{timeSinceComment[0]} {timeSinceComment[1]} ago</h6>
                    </div>
                    <div className='comment-text'>
                        
                        <div className="score-container">
                            <img className="vote-arrow" src={voteArrow}/>
                            <h6>{data.score >= 1000? `${(data.score / 1000).toFixed(1)}k` : data.score}</h6>
                            <img className="vote-arrow rotate180" src={voteArrow}/>
                        </div>
                        <p>{data.body}</p>
                    </div>
                </div>
            )
        })
    }
}

export default function Article ({articleData, comments}) {
    const dispatch = useDispatch();
    const votes = articleData.score >= 1000 ? `${(articleData.score / 1000).toFixed(1)}k` : articleData.score;


    const timeRightNow = Date.now();
    const timeSincePost = formatTime(articleData.created, timeRightNow);
    

    return (
        <div className="article">
            <div className="article-inner-container">
                <div className='article-subheader'><h4><NavLink>r/{articleData.subreddit}</NavLink> by u/{articleData.author} - {timeSincePost[0]} {timeSincePost[1]} ago </h4></div>
                    
                <div className="article-header">
                    <h2 className='no-margin'>{articleData.title}</h2>
                </div>
    
                    
                <div className="article-body">
                    {renderMedia(articleData.post_hint, articleData)}
                </div>

                <div className="article-comments">
                    {renderComments(comments, timeRightNow)}
                </div>
                <div className="article-actions">
                        <div className='no-margin votes-action'>
                            <p className='no-margin'><img className="vote-arrow" src={voteArrow}/>{votes} <img className="vote-arrow rotate180" src={voteArrow}/></p>
                        </div>
                        <p className='no-margin comments-action'>182 Comments</p>
                </div>
            </div>
        </div>
    )

    
}