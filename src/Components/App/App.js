import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import Searchbar from '../Searchbar/Searchbar';
import SubredditsBar from '../SubredditsBar/SubredditsBar';
import Feed from '../Feed/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoadingArticles, selectNumberOfArticlesToLoad, selectShowPage, setLoadArticles, setNumberOfArticlesToLoad } from '../Feed/feedSlice';

function App() {
  const dispatch = useDispatch();
  const articlesLoading = useSelector(selectIsLoadingArticles);
  const numberOfArticlesToLoad = useSelector(selectNumberOfArticlesToLoad);

  const loadMorePosts = false;



  setInterval(() => {
    if (thirdArticleFromBottom && thirdArticleFromBottom.top < 200 && loadMorePosts) {
      console.log('hello');
      //dispatch(setNumberOfArticlesToLoad(5));
    } else if (thirdArticleFromBottom && thirdArticleFromBottom.top > 200 && !loadMorePosts){
      console.log('this is fucked');
    }
  }, 1500);




  return ( 
    <Router>
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
let screenHeight;
let screenWidth;
let navBar;
let pulltab;

let articlesClassArray;
let thirdArticleFromBottom;
let loadMoreArticles = false;


window.addEventListener('scroll', function (event) {

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

    articlesClassArray = document.getElementsByClassName('article');
    thirdArticleFromBottom = articlesClassArray[articlesClassArray.length-3].getBoundingClientRect();
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
    if (clientX < 50 && clientY < window.innerHeight*0.5) {
        document.getElementById('subreddits-and-shadow-holder').style.left = '0px';
        document.getElementById('subreddits-header').style.margin = '0px 0 0 0';
        document.getElementById('subreddits-sider').style.margin = '0 45px 0 0';
    }
    if (clientX > 250 || clientY > window.innerHeight * 0.5) {
        document.getElementById('subreddits-and-shadow-holder').style.left = '-230px';
        document.getElementById('subreddits-header').style.margin = '45px 0 0 0';
        document.getElementById('subreddits-sider').style.margin = '0 0px 0 0';
    }
})


window.addEventListener('resize', function(event) {
    screenWidth = event.currentTarget.innerWidth;
    screenHeight = event.currentTarget.innerHeight;
    const fullSizeRatio = 1920/300;
    const searchBarWidth = screenWidth*0.15625;
    document.getElementById('searchbar').style.minWidth = `${searchBarWidth}px`;
    document.getElementById('searchbar').style.maxWidth = `${searchBarWidth}px`;
    

    // console.log(screenWidth);
})