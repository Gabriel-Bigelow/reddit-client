import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import Searchbar from '../Searchbar/Searchbar';
import SubredditsBar from '../SubredditsBar/SubredditsBar';
import Feed from '../Feed/Feed';

function App() {
  
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


const subredditsBar = document.getElementById('subreddits-and-shadow-holder');

const pulltab2 = document.getElementById('pulltab');

//move nav-bar to -5% top;
//move pulltab to -45px top and 10% left;

let offset;
let screenHeight;
let screenWidth;
let navBar;
let pulltab;
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