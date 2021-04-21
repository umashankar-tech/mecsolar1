import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DeviceTable from './DeviceTable';
import Toolbar from './Toolbar';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ProductList = ({data}) => {
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    // <Page
    //   className={classes.root}
    //   title="Customers"
    // >
    //   <Container maxWidth={false}>
    //     {/* <Toolbar show={false}/> */}
    //     <Box mt={3}>
          <DeviceTable customers={data} />
    //     </Box>
    //   </Container>
    // </Page>
  );
};

export default ProductList;
