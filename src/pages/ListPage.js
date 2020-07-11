import React from "react";
import _ from "lodash"
import { useSelector } from 'react-redux'
import AppBar from "../components/AppBar";
import BottomNav from "../components/BottomNav";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StorefrontIcon from '@material-ui/icons/Storefront';
import StoreHelper from "../util/StoreHelper";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const StoreItem = ({store}) => {
    const {addr, name, stock_at} = store;
    const {color, desc} = StoreHelper(store);
    return(
        <ListItem
        button = {true} 
        component = {Link}
        to={`/stores/${store.code}`}
        >
        <ListItemIcon>
            <StorefrontIcon style={{color}}/>
        </ListItemIcon>
        <ListItemText primary={
            <React.Fragment>
                <span style={{color}}>
                    <b>{name} </b> ({desc})
                </span>
            </React.Fragment>
        } secondary={
            <React.Fragment>
                <span>
                    {addr}
                </span>
                <br/>
                <span style={{color: "#ccc"}}>
                    입고: {stock_at}
                </span>
            </React.Fragment>
        }/>
      </ListItem>
    )
}

const ListPage = () => {
    const classes = useStyles();
    const stores = useSelector(state => state.stores) //리덕스의 store에 stores를 state로 가져오는것
    return (
        <>
        <AppBar/>
        <List className={classes.root}>
            {_.map(stores, store => <StoreItem key = {store.code} store={store}/>)}
        </List>
        <BottomNav/>
    </>
    )
}

export default ListPage;