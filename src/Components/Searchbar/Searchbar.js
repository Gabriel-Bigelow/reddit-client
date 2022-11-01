import './Searchbar.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import logo from './logo.png';
import picNightMode from '../../images/nightMode.png';
import { toggleNightMode } from '../../features/nightMode';
import pulltab from './pulltab.png'
import { clearSearchObjects, searchForArticles, selectReturnedSearch, selectSearchTerm, setSearch } from './searchSlice';
import { setArticles, setShowPage } from '../Feed/feedSlice';


export default function Searchbar () {
    const dispatch = useDispatch();
    const loggedIn = false;
    const searchTerm = useSelector(selectSearchTerm);
    
    
    function handleSubmit(event) {
        event.preventDefault();
        if (searchTerm.length > 0) {
            dispatch(searchForArticles(searchTerm));
        }
    }
    
    function handleChange (event) {
        dispatch(setSearch(event.target.value));
    }
    
    function handleLogoClick () {
        dispatch(setShowPage(''));
        dispatch(setArticles({}));
    }


    return (
        <nav id="nav-bar">

            <div className="inner" id="left-flex" onClick={handleLogoClick}>
                <img id="nav-logo" src={logo} alt="a blue reddit snoo"/>
                <h1 id="header">Lurker</h1>
            </div>
            
            <button id="night-mode-button" onClick={toggleNightMode}><img id="night-mode-logo" src={picNightMode} /> Night Mode</button>
            
            <div className="inner" id="center-flex">
                <div id="pulltab">
                    <img src={pulltab}></img>
                </div>
                <form onSubmit={handleSubmit}>
                    <input id="searchbar" placeholder='Search' onChange={handleChange}/>
                </form>
                <NavLink className="nav-bar-link">Popular</NavLink>
            </div>
            {/*renderAccount(loggedIn)
            remove this lower div later on. It's just there to satisfy styling issues until you figure out how to 
            create a backend that handles requests for the Reddit API*/}
            <div></div>

        </nav>
    )
}






/*
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
                <button id="log-in-button" onClick={handleClick}>Log In</button>
            </div>
        )
    }
}

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
            Reddit[request](auth.code, auth.state, auth.duration, auth.scope);
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
    */