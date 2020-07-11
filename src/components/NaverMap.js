/*global naver*/

import React from "react";
import _ from "lodash";
import { withRouter } from "react-router";
import { styled } from '@material-ui/core/styles';
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

        if(
            this.props.zoom !== nextProps.zoom||
            this.props.stores !== nextProps.stores||
            this.props.pinned !== nextProps.pinned
            ){
                this.loadPins(nextProps.stores, nextProps.pinned);
            }
        return false;
    }

    loadPins(stores, pinned){
        const icons = [
            pinBlack, pinGrey, pinRed, pinYellow, pinGreen, pinBlack
        ];


        var bounds = this.map.getBounds();
        if (this.pinMarker){
            this.pinMarker.setMap(null);
            this.pinMarker = null;
        }
        if(pinned && bounds.hasLatLng({ lat: pinned[0], lng: pinned[1]})){
            this.pinMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(...pinned),
                map: this.map,
                zIndex: 10,
            });
        }
        _.each(stores, store=>{
            if(this.markers[store.code]) {
                return;
            }
            if (bounds.hasLatLng({lat: store.lat, lng: store.lng})){
                const idx = StoreHelper(store).idx;
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(store.lat, store.lng),
                    map: this.map,
                    clickable: true,
                    zIndex: idx === 5? 0: idx,
                    icon: {
                        url: icons[idx],
                        size: new naver.maps.Size(64,64),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(32, 50),
                    }
                });
                naver.maps.Event.addListener(marker, 'click', ()=>{
                    this.props.history.push(`/stores/${store.code}`);
                })
                this.markers[store.code] = marker;
            }else{

            }
        })
    }

    componentDidMount(){
        const {center, zoom} = this.props;
        const node = this.mapRef.current;
        var mapOptions = {
            center: new naver.maps.LatLng(...center),
            zoom: zoom,
            scaleControl: true,
            mapTypeControl: true,
            zoomControl: true
        };
        this.map = new naver.maps.Map(node, mapOptions);
        naver.maps.Event.addListener(this.map, 'dragend', ()=>{
            const coord = this.map.getCenter();
            this.props.onChangeCenter && this.props.onChangeCenter([coord.lat(), coord.lng()])
            this.loadPins(this.props.stores, this.props.pinned);
        })
        naver.maps.Event.addListener(this.map, 'zoom_changed', zoom=>{
            this.props.onChangeZoom && this.props.onChangeZoom(zoom);
        });

        this.loadPins(this.props.stores, this.props.pinned);
        console.log("MAP INITIALIZED!!")

    }

    render(){

        return (
            <MapDiv ref={this.mapRef}/> 
        )
    }
}

export default withRouter(NaverMap);