import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import Searchbar from '../Searchbar/Searchbar';
import SubredditsBar from '../SubredditsBar/SubredditsBar';
import Feed from '../Feed/Feed';

function App() {

  
  return ( 
    <Router>
      <Searchbar />
      <SubredditsBar />
      <div id="body-container">
        
        <Feed />
        
      </div>
    </Router>
  );
}

export default App;