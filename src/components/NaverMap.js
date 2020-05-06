/*global naver*/

import React from "react";
import { connect } from 'react-redux'
import { styled } from '@material-ui/core/styles';
import {setMapZoom, setMapCenter } from "../actions/index"


const MapDiv = styled('div')({
    width: "100%",
    height: "100%",
});

class NaverMap extends React.Component{
    constructor(props){
        super(props);
        this.mapRef = React.createRef();

    }

    componentDidMount(){
        const {mapCenter, mapZoom, dispatch } = this.props
        const node = this.mapRef.current;
        var mapOptions = {
            center: new naver.maps.LatLng(...mapCenter),
            zoom: mapZoom,
            scaleControl: true,
            mapTypeControl: true,
            zoomControl: true
        };
        this.map = new naver.maps.Map(node, mapOptions);
        naver.maps.Event.addListener(this.map, 'dragend', ()=>{
            const coord = this.map.getCenter();
            dispatch(setMapCenter[coord.lat(), coord.lng()]);
        })
        naver.maps.Event.addListener(this.map, 'zoom_changed', zoom=>{
            dispatch(setMapZoom(zoom));
        })
    }

    render(){
        return (
            <MapDiv ref={this.mapRef}/> 
        )
    }
}
function mapStateToProps(state){
    const {mapCenter, mapZoom} = state
    return {mapCenter,mapZoom}
}
export default connect(mapStateToProps)(NaverMap);