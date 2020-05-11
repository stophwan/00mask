import React, { useEffect } from "react";
import AppBar from "../components/AppBar";
import BottomNav from "../components/BottomNav";
import NaverMap from "../components/NaverMap"
import {makeStyles} from '@material-ui/core/styles'
import { fetchStoreByGeo } from "../actions";
import {useSelector, useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    mapWrapper: {
      width: "100%",
      marginBottom: theme.spacing(7),
      height: `calc(100vh - ${2 * theme.spacing(7)}px)`
    },
  }));

const MapPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const center = useSelector(state=>state.center)
    useEffect(()=>{
        dispatch(fetchStoreByGeo(...center, 5000));
    })
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