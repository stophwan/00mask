import React from "react";
import AppBar from "../components/AppBar";
import BottomNav from "../components/BottomNav";
import NaverMap from "../components/NaverMap"
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    mapWrapper: {
      width: "100%",
      marginBottom: theme.spacing(7),
      height: `calc(100vh - ${2 * theme.spacing(7)}px)`
    },
  }));

const MapPage = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar/>
            <div className={classes.mapWrapper}>
                <NaverMap />
            </div>
            <BottomNav/>
        </>
    );
};

export default MapPage;