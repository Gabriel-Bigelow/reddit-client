import Article from "../Article/Article"

import './Feed.css'

export default function Feed () {
    return (
        <div id="articles-container">
            {/* come back to this and use .map() to populate the feed with articles */ }
            <Article />
            <Article />
            <Article />
            <Article />
        </div>
    )
}