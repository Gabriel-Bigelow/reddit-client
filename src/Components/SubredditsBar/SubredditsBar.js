import { NavLink } from 'react-router-dom';
import './SubredditsBar.css';

export default function SubredditsBar () {
    return (
        <div>
            <div className="subreddits-box"><h2>Gradient</h2></div>
                <div className="subreddits-box" id="subreddits-container">
                    <ul className="subreddit-links">
                        {/*replace with prop.map() function to create NavLinks*/}
                        <li><NavLink>Subreddit1</NavLink></li>
                        <li><NavLink>Subreddit2</NavLink></li>
                        <li><NavLink>Subreddit3</NavLink></li>
                        <li><NavLink>Subreddit4</NavLink></li>
                        <li><NavLink>Subreddit5</NavLink></li>
                        <li><NavLink>Subreddit6</NavLink></li>                
                    </ul>
                </div>
            <div className="subreddits-box"><h2>Shadow</h2></div>
        </div>
    )
};