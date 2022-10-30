import './Article.css'
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectComments, addArticleIDForComments, preloadCommentsForArticle} from './articleSlice';
import { useEffect } from 'react';
import voteArrow from './voteArrow.svg';
import Comment from '../Comment/Comment';

import { formatTime, decodeURL } from '../../features/formatting'


function renderMedia (type, articleData) {
    //render text articles like r/AskReddit
    if (!type && articleData.selftext) {
        if (articleData.selftext.includes('.com')) {
            //console.log(articleData.selftext);
        }
        return (
            <p className='article-text'>{decodeURL(articleData.selftext)}</p>
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


    useEffect(() => {
        if(articleData.post_hint === 'link' || !articleData.post_hint) {
            dispatch(addArticleIDForComments(articleData.id));
            dispatch(preloadCommentsForArticle(articleData.permalink, articleData.id))
        }
    }, [articleData])

    return (
        <div className="article">
            <div id='article-shadow'></div>
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
                            <p className='no-margin'><img className="vote-arrow" src={voteArrow} alt="upvote"/>{votes} <img className="vote-arrow rotate180" src={voteArrow} alt="downvote"/></p>
                        </div>
                        <p className='no-margin action-comments'>182 Comments</p>
                </div>
            </div>
        </div>
    )

    
}