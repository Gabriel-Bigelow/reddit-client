import { decodeURL, formatMarkdown } from "../../features/formatting";
import './Comment.css'

export default function Comment ({data, timeSinceComment, voteArrow}) {

    function renderFormattedCommentBody (text) {
        const formattedText = formatMarkdown(text);
        return formattedText.map(element => element)
    }



    return (
        <div className='comment-container' key={data.id} id={data.id}>
            <div className='comment-info'>
                <h5 className='inline-block'>{data.author}</h5>
                <h6 className='inline-block'>{timeSinceComment[0]} {timeSinceComment[1]} ago</h6>
            </div>
            <div className='comment-text'>
                
                <div className="score-container">
                    <img className="vote-arrow" src={voteArrow} alt="upvote" />
                    <div>
                        <h6>{data.score >= 1000? `${(data.score / 1000).toFixed(1)}k` : data.score}</h6>
                    </div>
                    <img className="vote-arrow rotate180" src={voteArrow} alt="downvote"/>
                </div>
                <div>{renderFormattedCommentBody(data.body)}</div>
            </div>
        </div>
    )
}