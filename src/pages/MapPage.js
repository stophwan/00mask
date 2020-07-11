import React from "react";
import AppBar from "../components/AppBar";
import BottomNav from "../components/BottomNav";
import NaverMap from "../components/NaverMap"
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from "react-redux";
import {setMapZoom, setMapCenter } from "../actions/index"

const useStyles = makeStyles((theme) => ({
    mapWrapper: {
      width: "100%",
      marginBottom: theme.spacing(7),
      height: `calc(100vh - ${2 * theme.spacing(7)}px)`
    },
  }));

const MapPage = () => {
    const classes = useStyles();
    const stores = useSelector(state => state.stores);
    const mapCenter = useSelector(state => state.mapCenter);
    const mapZoom = useSelector(state => state.mapZoom);
    const dispatch = useDispatch();
    return (
        <>
            <AppBar/>
            <div className={classes.mapWrapper}>
                <NaverMap 
                stores = {stores}
                center = {mapCenter}
                zoom = {mapZoom}
                onChangeCenter={center => {
                    dispatch(setMapCenter(center))
                }}
                onChangeZoom={zoom => {
                    dispatch(setMapZoom(zoom));
                }}
                />
            </div>
            <BottomNav/>
        </>
    );
};

export default MapPage;