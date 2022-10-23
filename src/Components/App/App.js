import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from 'react-router-dom';

import Searchbar from '../Searchbar/Searchbar';


function App() {
  return ( 
    <Router>
      <Searchbar />
    </Router>
  );
}

export default App;
