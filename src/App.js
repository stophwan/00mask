import React from 'react';
import{ BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage'
import ListPage from './pages/ListPage'
import MapPage from './pages/MapPage'




const useStyles = makeStyles((theme) => ({
  app: {
    marginTop: theme.spacing(7),
  },

}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className = {classes.app}>
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
    </div>
  </Router>
  );
}

export default App;
