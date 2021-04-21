import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import RoleList from './RoleList';
import ToolbarRole from './ToolbarRole';
import data from './roleData';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RoleView = () => {
  const classes = useStyles();
  const [roles] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Roles"
    >
      <Container maxWidth={false}>
        <ToolbarRole />
        <Box mt={3}>
          <RoleList roles={roles} />
        </Box>
      </Container>
    </Page>
  );
};

export default RoleView;
