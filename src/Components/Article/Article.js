import './Article.css'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown'
import { SelectComments, addArticleIDForComments, preloadCommentsForArticle, loadAllCommentsForArticle, setDisplayHowManyComments, loadAdditionalCommentsForArticle } from './articleSlice';
import { useEffect } from 'react';
import voteArrow from './voteArrow.svg';
import Comment from '../Comment/Comment';

import { formatTime, decodeURL } from '../../features/formatting'
import { loadSubredditPage, setSelectedSubreddit } from '../SubredditsBar/subredditsBarSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { setShowPage } from '../Feed/feedSlice';


function renderMedia (type, articleData) {
    //render text articles like r/AskReddit
    if (!type && articleData.selftext) {
        if (articleData.selftext.includes('.com')) {
            //console.log(articleData.selftext);
        }
        return (
            //<p className='article-text'>{decodeURL(articleData.selftext)}</p>
            <ReactMarkdown children={articleData.selfText}></ReactMarkdown>
        )

    //render image posts with more than 1 image
    }
    if (!type && !articleData.selftext && articleData.url.includes('/gallery')) {
        return (
            <p className='article-text'>FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME FIX ME
            </p>
        )
    } /*else if (type === "link") {
        if (articleData.preview.reddit_video_preview) {
            return (
                <video controls autoPlay muted loop>
                    <source src={articleData.preview.reddit_video_preview.fallback_url} type="video/mp4"/>
                </video>
            )
        }
        else {
            return (
                <div className="article-link-and-frame">
                    <a className='article-text out-link' href={articleData.url} target="_blank">{articleData.url}</a>
                    <iframe src={articleData.url}></iframe>
                </div>
            )
        } 
    } */ else if (type === "image") {
        return (
                <img src={articleData.url} alt={articleData.title}/>
        )
    } else if (type === "hosted:video") {
        return (
            <video controls autoPlay muted loop>
                <source src={articleData.media.reddit_video.fallback_url} type="video/mp4" />
            </video>
        )
    } else if (type === "rich:video") {
        //console.log(articleData.media_embed.content);
    }
}

const pageNotLoaded = () => {
    return;
}

function renderComments (comments, timeRightNow) {
    const commentsArray = [];

    if (comments && comments.commentsList) {
        const commentsList = comments.commentsList;
        for (let comment of Object.keys(commentsList)) {
            if (commentsList[comment] !== null && commentsArray.length < comments.displayHowManyComments && commentsArray.length < comments.commentsLoaded && commentsList[comment]) {
                commentsArray.push(commentsList[comment]);
            }
        }
        return commentsArray.map(comment => {
            const timeSinceComment = formatTime(comment.created, timeRightNow)
            return <Comment key={comment.id} data={comment} timeSinceComment={timeSinceComment} voteArrow={voteArrow}/>
        })
    }
}





function popoutImage ({target}) {

}

export default function Article ({articleData}) {
    const dispatch = useDispatch();
    const timeRightNow = Date.now();
    const timeSincePost = formatTime(articleData.created, timeRightNow);
    const votes = articleData.score >= 1000 ? `${(articleData.score / 1000).toFixed(1)}k` : articleData.score;
    const comments = SelectComments(`t3_${articleData.id}`);
    


    function showMoreComments () {
        const currentNumComments = comments ? comments.displayHowManyComments : 0;
        const newNum = currentNumComments + 3;
        if (!comments.allCommentsLoaded) {
            dispatch(loadAllCommentsForArticle(articleData.permalink))
        }
        
        if (comments && comments.commentsList) {
            if (comments.allCommentsLoaded && comments.displayHowManyComments + 15 >= comments.commentsLoaded) {
                const moreCommentsArray = [];
                for (let comment of Object.keys(comments.commentsList)) {
                    if (comments.commentsList[comment] === null && moreCommentsArray.length < Math.max(15, (comments.displayHowManyComments - comments.commentsLoaded)+15 )) {
                        moreCommentsArray.push(comment);
                    }
                }
                if (moreCommentsArray.length > 0) {
                    dispatch(loadAdditionalCommentsForArticle({subreddit: articleData.subreddit, articleID: articleData.id, commentIDArray: moreCommentsArray})).then(unwrapResult)
                    .then(originalPromiseResult => {})
                    .catch(rejected => {console.log(rejected)});
                } else {
                    console.log('no more comments!');
                }
            }
        }

        dispatch(setDisplayHowManyComments({displayHowManyComments: newNum, comments: comments}))
    }

    function showLessComments () {
        dispatch(setDisplayHowManyComments({displayHowManyComments: 3, comments: comments}));
        document.getElementById(articleData.id).scrollIntoView(true);
    }


    useEffect(() => {
        if(articleData.post_hint === 'link' || !articleData.post_hint) {
            dispatch(addArticleIDForComments(articleData.id));
            dispatch(preloadCommentsForArticle(articleData.permalink));
        } else {
            dispatch(addArticleIDForComments(articleData.id));
        }
    }, [articleData])

    function handleClick (event) {
        dispatch(loadSubredditPage(event.target.id.slice(0, event.target.id.length-13)));
        dispatch(setSelectedSubreddit(event.target.id.slice(0, event.target.id.length-13)));
    }

    return (
        <div className="article" id={articleData.id}>
            <div id={`${articleData.id}-article-shadow`}></div>
            <div className="article-inner-container">
                <div className='article-subheader'><h4><NavLink id={`/r/${articleData.subreddit}/-article-link`} onClick={handleClick}>r/{articleData.subreddit}</NavLink> by u/{articleData.author} - {timeSincePost[0]} {timeSincePost[1]} ago </h4></div>
                    
                <div className="article-header">
                    <h2 className='no-margin'>{decodeURL(articleData.title)}</h2>
                </div>
    
                    
                <div className="article-body">
                    {renderMedia(articleData.post_hint, articleData)}
                </div>

                <div className="article-comments">
                    {renderComments(comments, timeRightNow)}
                </div>
                {(comments && comments.commentsList) ? (comments.displayHowManyComments > 3 ? <div id="hide-comments" onClick={showLessComments}>^</div> : undefined) : undefined}
                <div id={`${articleData.id}-article-actions`} className="article-actions">
                        <div className='no-margin votes-action'>
                            <p className='no-margin'><img className="vote-arrow" src={voteArrow} alt="upvote"/>{votes} <img className="vote-arrow rotate180" src={voteArrow} alt="downvote"/></p>
                        </div>
                        <p className='no-margin action-comments' onClick={showMoreComments}>{commentCount(comments)}</p>
                </div>
            </div>
        </div>
    )    
}

function commentCount (comments) {
    let phrase;

    if (comments && comments.commentsList) {
        if (comments.displayComments !== 0) {
            phrase = `More comments (${Object.keys(comments.commentsList).length})`
        } 
        if (comments.displayHowManyComments > comments.commentsLoaded && comments.displayHowManyComments) {
            phrase = `Showing all comments (${Object.keys(comments.commentsList).length})`;
        }
    } else {
        phrase = `Show comments`;
    }
    return phrase;
}

