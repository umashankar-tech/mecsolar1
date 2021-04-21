import React, { useState,useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductCard from './ProductCard';
import Toolbar from './Toolbar';
import data from './data';
import { useSelector, useDispatch } from 'react-redux';
import {matchSorter} from 'match-sorter';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DeviceListView = () => {
  const classes = useStyles();
  const reduxEntityDeviceData = useSelector(
    (state) => state.product.entityDeviceData
  );
  console.log('devices-->',reduxEntityDeviceData)
  const [customers,setCustomers] = useState(reduxEntityDeviceData);
  useEffect(() => {
    setCustomers(reduxEntityDeviceData)
  },[reduxEntityDeviceData])
  const searchFetch = (searchText)=>{
   
    var newList = [];
    setCustomers( newList);
    newList = matchSorter(reduxEntityDeviceData, searchText, {
      keys: ['DevID','DisplayName','Entity'],
    });
    console.log(reduxEntityDeviceData,newList)
    setCustomers( newList);
  
  }
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar searchFetch={searchFetch}/>
        <Box mt={3}>
          <ProductCard customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default DeviceListView;
