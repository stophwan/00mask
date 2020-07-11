import React, { useEffect }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import AboutPage from "./pages/AboutPage";
import MapPage from "./pages/MapPage";
import ListPage from "./pages/ListPage";
import HelpPage from "./pages/HelpPage";
import StorePage from "./pages/StorePage";
import { fetchStoresByGeo } from "./actions";
import { useSelector, useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
  app: {
    marginTop: theme.spacing(7),
  },

}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const center = useSelector(state=>state.center)
  useEffect(()=>{
      dispatch(fetchStoresByGeo(...center, 5000));
  })
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
          <Route path="/help">
            <HelpPage/>
          </Route>
          <Route path="/stores/:code">
            <StorePage/>
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
