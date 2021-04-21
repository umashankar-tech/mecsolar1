import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import { v4 as uuid } from 'uuid';
import { useAuth } from "src/contexts/AuthContext";
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [userList,setUserList] = useState([]);
  const [entityList,setEntityList] = useState([]);
  const [refreshUserList, setRefreshUserList] = useState(false);
  const [customers] = useState(data);
  const { fetchUsers, fetchEntitys } = useAuth();
  const reduxUserData = useSelector(
    (state) => state.product.userData
  );
  const fetchUserList = async () => {
    let users = await fetchUsers();
    let userValues = [];
    let userItems = reduxUserData.forEach(item=>{
      let userData = item;
      let userValue = {
        id: uuid(),
        createdAt: 1554757200000,
        email: userData['Email'],
        name: userData['Name'],
        phone: userData['Contact'],
        role: userData['Role'],
        entity: userData['Entity']
      }
      userValues = [...userValues,userValue]; 
     })
     setUserList(userValues);
  }


  const fetchUserData = async () => {
    let entity = await fetchEntitys();
    await fetchUserList();
    let entityValues = []; 
    let entityData = entity.docs.forEach(item=>{
      let entity = item.data()
      let entityItem = {
          id: entity['Name'],
          entity: entity['Name'],
          users: 20,
          devices: 50,
          parentId: entity['Parent Entity']
        }
        if (entity['Name']) {
          entityValues = [...entityValues,entityItem];
         }
     })
     setEntityList(entityValues);
  }

  useEffect(() => {
    fetchUserData();
  },[refreshUserList,reduxUserData])

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar {...{entityList}} refreshUserList={async () => await fetchUserList()} />
        <Box mt={3}>
          {userList.length > 0 && <Results customers={userList} />}
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
