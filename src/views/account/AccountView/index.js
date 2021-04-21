import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Toolbar from './Toolbar';
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

const Account = () => {
  const [entityList,setEntityList] = useState([]);
  const [refreshEntityData,setRefreshEntityData] = useState(false);
  const [updater,setUpdater] = useState(1)
  const classes = useStyles();
  const { fetchEntitys } = useAuth();
  const reduxEntityData = useSelector(
    (state) => state.product.entityData
  );

  const fetchEntityData = async () => {
    let entity = await fetchEntitys();
    let entityValues = [];

    reduxEntityData.forEach(entity=>{

      // let entity = item.data()
      let entityItem = {
          id: entity['Name'],
          entity: entity['Name'],
          users: 20,
          devices: 50,
          parentId: entity['ParentEntity']
        }
        if (entity['Name']) {
          entityValues = [...entityValues,entityItem];
         }
     })
     setEntityList(entityValues);
  }

  useEffect(() => {
    fetchEntityData();
  },[reduxEntityData])
  useEffect(() => {
    setUpdater(updater+1)
  },[reduxEntityData])
  const refreshEntityTableData = () => {
    setRefreshEntityData(!refreshEntityData);
  }

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="100%">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Toolbar refreshEntityTable={refreshEntityTableData} {...{entityList}}/>
            {entityList.length > 0 && <ProfileDetails {...{entityList}}/>}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
