import './Article.css'
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown'
import { SelectComments, addArticleIDForComments, preloadCommentsForArticle, changeDisplayHowManyComments, loadAllCommentsForArticle} from './articleSlice';
import { useEffect } from 'react';
import voteArrow from './voteArrow.svg';
import Comment from '../Comment/Comment';

import { formatTime, decodeURL } from '../../features/formatting'
import { loadSubredditPage } from '../SubredditsBar/subredditsBarSlice';


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
    if (comments && comments.comments) {
        const commentsArray = [];
        for (let comment of comments.comments) {
            if (comment.kind === 't1' && comment.data.author !== 'AutoModerator' && commentsArray.length < comments.displayHowManyComments) {
                commentsArray.push(comment);
            }
        }

        return commentsArray.map(comment => {
            const {data} = comment;
            const timeSinceComment = formatTime(data.created, timeRightNow)
            return <Comment key={data.id} data={data} timeSinceComment={timeSinceComment} voteArrow={voteArrow}/>
        })
    }
}





function popoutImage ({target}) {

}

export default function Article ({articleData}) {
    const dispatch = useDispatch();
    const votes = articleData.score >= 1000 ? `${(articleData.score / 1000).toFixed(1)}k` : articleData.score;
    const comments = SelectComments(`t3_${articleData.id}`);
    const timeRightNow = Date.now();
    const timeSincePost = formatTime(articleData.created, timeRightNow);


    function showMoreComments () {
        const currentNumComments = comments ? comments.displayHowManyComments : 0;
        const newNum = currentNumComments + 3;
        if (!comments.allCommentsLoaded) {
            dispatch(loadAllCommentsForArticle(articleData.permalink))
        }
        dispatch(changeDisplayHowManyComments({displayHowManyComments: newNum, comments: comments}))
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

    if (comments && comments.comments) {
        if (comments.comments && comments.comments[comments.comments.length-1].kind === 'more') {
            phrase = `More comments (${comments.comments[comments.comments.length-1].data.count})`;
        } else if (typeof comments.comments !== 'array' || (typeof comments.comments === 'array' && comments.comments.length > comments.displayHowManyComments)) {
            phrase = `Showing all comments`
        } else {
            phrase = `More comments (${comments.comments.length})`;
        }
    } else {
        phrase = `Show comments`;
    }
    return phrase;
}