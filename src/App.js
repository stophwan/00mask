import React from 'react';
import{ BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage'
import ListPage from './pages/ListPage'
import MapPage from './pages/MapPage'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/list">
          <ListPage/>
        </Route>
        <Route path="/list">
          <MapPage/>
        </Route>
        <Route path="/">
          <MapPage />
        </Route>
    </Switch>
  </Router>
  );
}

export default App;
