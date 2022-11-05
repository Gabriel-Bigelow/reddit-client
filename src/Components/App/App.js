import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import Searchbar from '../Searchbar/Searchbar';
import SubredditsBar from '../SubredditsBar/SubredditsBar';
import Feed from '../Feed/Feed';
import { useDispatch } from 'react-redux';
import { setNumberOfArticlesToLoad } from '../Feed/feedSlice';
let firstLoad = true;

function App() {
    const dispatch = useDispatch();
    let loadNewArticles = false;
  

    if (firstLoad) {
        setInterval(() => {
            const articlesClassArray = document.getElementsByClassName('article');
            const fourthArticleFromBottom = articlesClassArray[articlesClassArray.length-4].getBoundingClientRect();
            //console.log(window.frames);
            //console.log(document.getElementsByClassName('iframes'));

            firstLoad = false;
        
            if (fourthArticleFromBottom.top < 0) {
                loadNewArticles = true;
            }
            if (loadNewArticles) {
                loadNewArticles = false;
                dispatch(setNumberOfArticlesToLoad(5));
            }


            for (let frame of document.getElementsByClassName('iframes')) {
              let globalCount = 0;
              for (let key of Object.keys(frame.contentWindow)) {
                  if (typeof parseInt(key) === 'number') {
                      globalCount++;
                  }
              }
              if (globalCount < 1) {
                  frame.parentNode.removeChild(frame);
              }
          }
        }, 2000);
    }

    function closePopout (event) {
        const child = event.target.lastChild

        event.target.removeChild(child);
        event.target.style.backgroundColor = "rgba(100, 100, 100, 0)";
        event.target.style.zIndex = '-10';
    }
  


  return ( 
    <Router>
      <div id="popped-out-container" onClick={closePopout}></div>
      <Searchbar />
      
      <div id="body-container">
        <Feed />
        <SubredditsBar /> 
      </div>
    </Router>
  );
}

export default App;









let offset;
let navBar;
let pulltab;


window.addEventListener('scroll', function () {
    offset = window.pageYOffset;
    navBar = document.getElementById('nav-bar');
    pulltab = document.getElementById('pulltab');
    if (offset <= 30){
      navBar.style.top = 0;
      pulltab.style.top = '-70px';
      this.setTimeout(() => {
        pulltab.style.left = '50%'
      }, 500)
    } else if (offset > 30 ){
        navBar.style.top = '-50px';
        pulltab.style.top = '-45px';
        this.setTimeout(() => {
          pulltab.style.left = '5%'
        }, 500)
    }
})
window.addEventListener('mousemove', function ({clientX, clientY}) {
  navBar = document.getElementById('nav-bar');
  pulltab = document.getElementById('pulltab');
    if (clientY < 50) {
        navBar.style.top = '0';
        pulltab.style.top = '-70px';
        this.setTimeout(() => {
          pulltab.style.left = '50%'
        }, 500)
        
    } else if (offset > 30 && clientY > 50) {
        navBar.style.top = '-50px';
        navBar.style.top = '-50px';
        pulltab.style.top = '-45px';
        this.setTimeout(() => {
          pulltab.style.left = '5%'
        }, 500)
    }
    if (clientX < 50 && clientY < window.innerHeight*0.85) {
        document.getElementById('subreddits-and-shadow-holder').style.left = '0px';
        document.getElementById('subreddits-header').style.margin = '0px 0 0 0';
        document.getElementById('subreddits-sider').style.margin = '0 45px 0 0';
    }
    if (clientX > 250 || clientY > window.innerHeight * 0.85) {
        document.getElementById('subreddits-and-shadow-holder').style.left = '-230px';
        document.getElementById('subreddits-header').style.margin = '45px 0 0 0';
        document.getElementById('subreddits-sider').style.margin = '0 0px 0 0';
    }
})


window.addEventListener('resize', function(event) {
    const searchBarWidth = event.currentTarget.innerWidth*0.15625;
    document.getElementById('searchbar').style.minWidth = `${searchBarWidth}px`;
    document.getElementById('searchbar').style.maxWidth = `${searchBarWidth}px`;

    const sidebarShadow = document.getElementById('subreddits-inner-container');

    sidebarShadow.style.gridTemplateRows = `45px ${(window.innerHeight*0.7/969) * window.innerHeight}px`;
})