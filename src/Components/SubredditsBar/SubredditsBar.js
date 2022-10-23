import { NavLink } from 'react-router-dom';
import './SubredditsBar.css';

export default function SubredditsBar () {
    return (
        <div id='subreddits-container'>
            <div className='subreddits'>
                <div id="subreddits-inner-container">
                    <h1>Subreddits</h1>
                    <ul className="subreddit-links">
                        {/*replace with prop.map() function to create NavLinks*/}
                        <li><NavLink>r/Subreddit1</NavLink></li>
                        <li><NavLink>r/Subreddit2</NavLink></li>
                        <li><NavLink>r/Subreddit3</NavLink></li>
                        <li><NavLink>r/Subreddit4</NavLink></li>
                        <li><NavLink>r/Subreddit5</NavLink></li>
                        <li><NavLink>r/Subreddit6</NavLink></li>                
                    </ul>
                </div>
            </div>
        </div>
    )
};