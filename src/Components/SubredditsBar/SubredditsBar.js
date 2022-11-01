import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SubredditsBar.css';
import { loadSubreddits, selectSubreddits } from './subredditsBarSlice';

export default function SubredditsBar () {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    let mostPopularSubreddits = [];
    

    useEffect(() => {
        if (Object.keys(subreddits).length === 0) {
            dispatch(loadSubreddits());
        }
    }, [subreddits]);



    return (
        <div id='subreddits-container'>
            
            <div id="subreddits-and-shadow-holder">
                <div id='subreddits-shadow'></div>
                <div className='subreddits'>
                    <div id="subreddits-inner-container">
                        <h1 id="subreddits-header">Subreddits</h1>
                        <ul id="subreddit-links">
                            {renderSubreddits(subreddits)}
                            {/*<li><NavLink>r/funny</NavLink></li>
                            <li><NavLink>r/AskReddit</NavLink></li>
                            <li><NavLink>r/gaming</NavLink></li>
                            <li><NavLink>r/aww</NavLink></li>
                            <li><NavLink>r/music</NavLink></li>
                            <li><NavLink>r/pics</NavLink></li>
                            <li><NavLink>test</NavLink></li>
                            <li><NavLink>test</NavLink></li>
                            <li><NavLink>test</NavLink></li>
                            <li><NavLink>test</NavLink></li>
                            <li><NavLink>test</NavLink></li>
                            <li><NavLink>test</NavLink></li> */}
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

function renderSubreddits (subreddits) {
    let mostPopularSubreddits = [];
    if (Object.keys(subreddits).length !== 0) {
        mostPopularSubreddits = top25Subreddits(subreddits);

        return mostPopularSubreddits.map(subreddit => {
            console.log(subreddit);
            return (
                <li>
                    <div>
                        <NavLink key={subreddit.url.slice(0, subreddit.url.length-1)} id={subreddit.url.slice(0, subreddit.url.length-1)}>{subreddit.url.slice(0, subreddit.url.length-1)}</NavLink>
                        <p class="subscriber-count">{subreddit.subscribers.toLocaleString('en-us')} users</p>
                    </div>
                </li>
            )
        })
    }
}