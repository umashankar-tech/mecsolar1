import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  withStyles,
  Grid,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import data from './roleData';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {
  PersonAdd,
  Lock,
  SupervisorAccount,
  TrendingUp,
  Devices
} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiAccordionDetails);

const PermissionView = () => {
  const classes = useStyles();
  const [roles] = useState(data);
  const [expanded, setExpanded] = React.useState('panel1');
  const [roleselected,setRole] = useState('');

  const [state, setState] = React.useState({
    checkedDeviceRead: false,
    checkedDeviceManage: false,
    checkedUserRead: false,
    checkedUserManage: false,
    checkedEntityRead: false,
    checkedEntityManage: false,
    checkedDashboardManage: false,
    role: '',
  });
  const handleChangeRole = (event) => {
    alert(event.target.value)
    setRole(event.target.value);
  };
  const handleChangeData = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Page className={classes.root} title="Permissions">
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid container item xs={12}>
           <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state.role}
          onChange={handleChangeRole}
          label="Role"
        >
         
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>User</MenuItem>
          <MenuItem value={3}>Access</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid container item xs={12}>
            <Accordion square expanded="true"  style={{ margin: '10px','width':'100%' }}>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Devices color="secondary" style={{ fontSize: 28 }} />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ 'margin-left': '10px' }}
                >
                  Devices
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                 <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedDeviceRead}
                        onChange={handleChangeData}
                        name="checkedDeviceRead"
                      />
                    }
                    label="Read"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedDeviceManage}
                        onChange={handleChangeData}
                        name="checkedDeviceManage"
                        color="primary"
                      />
                    }
                    label="Manage"
                  />
                  
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded="true"  style={{ margin: '10px','width':'100%' }}>
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <PersonAdd color="secondary" style={{ fontSize: 28 }} />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ 'margin-left': '10px' }}
                >
                  Users
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedUserRead}
                        onChange={handleChangeData}
                        name="checkedUserRead"
                      />
                    }
                    label="Read"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedUserManage}
                        onChange={handleChangeData}
                        name="checkedUserManage"
                        color="primary"
                      />
                    }
                    label="Manage"
                  />
                  
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded="true"  style={{ margin: '10px','width':'100%' }}>
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <TrendingUp color="secondary" style={{ fontSize: 28 }} />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ 'margin-left': '10px' }}
                >
                  Entity
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedEntityRead}
                        onChange={handleChangeData}
                        name="checkedEntityRead"
                      />
                    }
                    label="Read"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedEntityManage}
                        onChange={handleChangeData}
                        name="checkedEntityManage"
                        color="primary"
                      />
                    }
                    label="Manage"
                  />
                  
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded="true" style={{ margin: '10px','width':'100%' }}>
              <AccordionSummary
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <DashboardIcon color="secondary" style={{ fontSize: 28 }} />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ 'margin-left': '10px' }}
                >
                  Dashboard
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup row>
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedDashboardManage}
                        onChange={handleChangeData}
                        name="checkedDashboardManage"
                        color="primary"
                      />
                    }
                    label="Manage"
                  />
                  
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
                <Grid container item xs={2}>
                  <Button
                    color="primary"
                   className={classes.formControl}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid container item xs={2}>
                  
                </Grid>
                <Grid container item xs={2}>
                  
                </Grid>
                <Grid container item xs={2}>
                  
                </Grid>
                <Grid container item xs={2}>
                  
                </Grid>
                <Grid container item xs={2}>
                  
                </Grid>
              </Grid>
      </Container>
    </Page>
  );
};

export default PermissionView;
