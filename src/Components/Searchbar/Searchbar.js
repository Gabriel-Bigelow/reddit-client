import './Searchbar.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import logo from './logo.png';
import { Reddit, selectReddit, setDuration, setCode, setScope, randomState, selectCode, selectDuration, selectScope, selectState, selectAuth, selectTest, redditSlice, setSendRequest, setRequest, selectSendRequest, selectRequest, selectAll, setAccessToken, selectAccessToken} from '../App/Reddit';

import { selectArticles } from '../Feed/feedSlice';



function renderAccount (loggedIn, handleClick) {
    if (loggedIn) {
        return (
            <div className="inner" id="right-flex">
                <NavLink className="nav-bar-link">Notifications</NavLink>
                <NavLink className="nav-bar-link">Account name</NavLink>
            </div>
        )
    } else {
        return (
            <div className="inner" id="right-flex">
                <button onClick={handleClick}>Log In</button>
            </div>
        )
    }
}


export default function Searchbar () {
    const dispatch = useDispatch();
    const loggedIn = false;

    const auth = useSelector(selectAuth);
    const sendRequest = useSelector(selectSendRequest);
    const request = useSelector(selectRequest);
    const accessToken = useSelector(selectAccessToken);

    //sets the request body for 
    async function handleLogIn () {
        dispatch(setCode('code'));
        dispatch(randomState());
        dispatch(setDuration('temporary'))
        dispatch(setScope('identity'));
        
        dispatch(setSendRequest(true));
        const req = 'authorize'
        dispatch(setRequest(req))        
    }

    //reddit recommends that state is checked to be the same as what was sent, but I don't know how to do that. Can't find it on google.
    function handleRequest () {
        if (sendRequest) {
            dispatch(setSendRequest(false));
            Reddit.postAccessToken();
            //Reddit[request](auth.code, auth.state, auth.duration, auth.scope);
        } else {
            if (window.location.href.match(/code=([^&]*)/)) {
                const word = 'code='
                const start = window.location.href.search(word);
                const code = window.location.href.slice(start+word.length);
                dispatch(setAccessToken(code));
            }
        }
    }
    handleRequest();






    return (
        <nav id="nav-bar">
            
            <div className="inner" id="left-flex">
                <img id="nav-logo" src={logo} alt="a blue reddit snoo"/>
                <h1 id="header">Lurker</h1>
            </div>
            
            
            <div className="inner" id="center-flex">
                <form>
                    <input id="searchbar" placeholder='Search' />
                </form>
                <NavLink className="nav-bar-link">Popular</NavLink>
            </div>
            {renderAccount(loggedIn, handleLogIn)}

        </nav>
    )
}







