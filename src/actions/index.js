import axios from "axios";

const BASE_URL = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1"

export function setMapZoom(zoom) {
    return{
        type:"SET_MAP_ZOOM",
        payload: zoom
    }
}

export function setMapCenter(coord){
    return {
        type: "SET_MAP_CENTER",
        payload: coord
    }
}

export function fetchStoresByGeo(lat, lng, m){
    return async (dispatch)=>{
        const url = `${BASE_URL}/storesByGeo/json`;
        try{
            const result = await axios(url, {params: { lat, lng, m}})
            dispatch({
                type: 'FETCH_STORES', payload: result.data});
        }catch(error){
        
        }
    }
}