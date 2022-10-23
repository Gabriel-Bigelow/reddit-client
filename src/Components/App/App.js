import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from 'react-router-dom';

import './App.css'
import Searchbar from '../Searchbar/Searchbar';
import SubredditsBar from '../SubredditsBar/SubredditsBar';
import Feed from '../Feed/Feed';


function App() {
  return ( 
    <Router>
      
      <Searchbar />
      <div>
        <Feed />
        <SubredditsBar />
      </div>
           
    </Router>
  );
}

export default App;
