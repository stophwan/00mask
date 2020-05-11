/*global naver*/

import React from "react";
import _ from "lodash";
import { connect } from 'react-redux'
import { styled } from '@material-ui/core/styles';
import {setMapZoom, setMapCenter } from "../actions/index"
import StoreHelper from "../util/StoreHelper";
import pinGreen from "../green.png";
import pinBlack from "../black.png";
import pinRed from "../red.png";
import pinYellow from "../yellow.png";
import pinGrey from "../grey.png";

const MapDiv = styled('div')({
    width: "100%",
    height: "100%",
});

class NaverMap extends React.Component{
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
        this.markers = {};
    }

    shouldComponentUpdate(nextProps, nextState){
        if(!this.map){
            return true;
        }

        if(this.props.mapZoom !== nextProps.mapZoom||
            this.props.stores !== nextProps.stores){
                this.loadPins(nextProps.stores);
            }
        return false;
    }

    loadPins(stores){
        const icons = [
            pinBlack, pinGrey, pinRed, pinYellow, pinGreen, pinBlack
        ];


        var bounds = this.map.getBounds();
        _.each(stores, store=>{
            if(this.markers[store.code]) {
                return;
            }
            if (bounds.hasLatLng({lat: store.lat, lng: store.lng})){
                const idx = StoreHelper(store).idx;
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(store.lat, store.lng),
                    map: this.map,
                    zIndex: idx === 5? 0: idx,
                    icon: {
                        url: icons[idx],
                        size: new naver.maps.Size(64,64),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(32, 50)
    
                    }
                });
                this.markers[store.code] = marker;
            }
        })
    }

    componentDidMount(){
        const {mapCenter, mapZoom, dispatch } = this.props;
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
            dispatch(setMapCenter([coord.lat(), coord.lng()]));
            this.loadPins(this.props.stores);
        })
        naver.maps.Event.addListener(this.map, 'zoom_changed', zoom=>{
            dispatch(setMapZoom(zoom));
        })

        this.loadPins();
        console.log("MAP INITIALIZED!!")

    }

    render(){
        console.log("RENDER!!")
        if (this.map){
            this.loadPins();
        }
        return (
            <MapDiv ref={this.mapRef}/> 
        )
    }
}
function mapStateToProps(state){
    const {mapCenter, mapZoom, stores} = state
    return {mapCenter,mapZoom, stores}
}
export default connect(mapStateToProps)(NaverMap);