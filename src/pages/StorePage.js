import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import AppBar from "../components/AppBar";
import BottomNav from "../components/BottomNav";
import NaverMap from "../components/NaverMap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StoreHelper from "../util/StoreHelper";


const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    mapWrapper: {
      marginTop: theme.spacing(3),
      width: "100%",
      marginBottom: theme.spacing(7),
      height: '400px'
    },
    addr: {
      margin: `${theme.spacing(3)}px 0`,
      fontWeight: "bold",
      color: "#369"
    }
  }));
  const StorePage = () => {
    const classes = useStyles();
  
    const { code } = useParams();
    const store = useSelector(state => state.stores[code])
    const stores = useSelector(state => state.stores)
    if (!store) {
      return (<div>Loading</div>);
    }
    const stat = StoreHelper(store);
    return (
      <>
        <AppBar />
        <Container maxWidth="sm">
          <div className={classes.root}>
            <h1>{store.name}</h1>
            <div className="addr">{store.addr}</div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow key="remain_stat">
                    <TableCell component="th" scope="row">
                      재고 수량
                    </TableCell>
                    <TableCell>
                      {stat.desc}
                    </TableCell>
                  </TableRow>
                  <TableRow key="stock_at">
                    <TableCell component="th" scope="row">
                      입고 시간
                    </TableCell>
                    <TableCell>
                      {store.stock_at}
                    </TableCell>
                  </TableRow>              
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={classes.mapWrapper}>
            <NaverMap 
              stores={stores} 
              center={[store.lat, store.lng]} 
              zoom={17}
              pinned={[store.lat, store.lng]} 
            />
          </div>
        </Container>
        <BottomNav />
      </>
    );
  };

export default StorePage;