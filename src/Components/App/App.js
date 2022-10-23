import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from 'react-router-dom';

import Searchbar from '../Searchbar/Searchbar';
import SubredditsBar from '../SubredditsBar/SubredditsBar';


function App() {
  return ( 
    <Router>
      <Searchbar />

      <SubredditsBar />      
    </Router>
  );
}

export default App;
