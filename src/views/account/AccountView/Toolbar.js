import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Container,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Search as SearchIcon } from 'react-feather';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import {setEntityDeviceDataUpdater} from '../../../redux/action'
import { useAuth } from "src/contexts/AuthContext";
// import { useEntity } from "src/contexts/EntityContext";
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../../../firebase';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  error: {
    border: '1px solid red',
    color: 'red'
  }
}));

const Toolbar = ({ className, entityList, refreshEntityTable, ...rest }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const reduxEntityData = useSelector(
    (state) => state.product.entityData
  );

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const {  addEntity } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            name: '',
            address: '',
            state: '',
            entity: '',
            city:'',
            pin:''
          }}
          validationSchema={Yup.object().shape({
            address: Yup.string().required('Address is required'),
            name: Yup.string().required('Name is required'),

            entity: Yup.string().required('Entity is required'),
            state: Yup.string().required('State is required'),
            city: Yup.string().required('City is required'),
            pin: Yup.string().required('Pin is required')
          })}
          onSubmit={async (values, actions) => {
            let { name, address, state, entity,city,pin } = values;
            let entityCreateData = {
              'Name': name,
              'Address': address,
              'ParentEntity': entity,
              'State': state,
              'City':city,
              'Pin':pin,
              'Child':[],
              'Devices':[],
              'device_count':'',
              'user_count':'',
              'createdOn':new Date()
            }
          
           let updatedList= _.filter(reduxEntityData, function(o) { return o.Name == entity; });
       
          let childTest= _.filter(updatedList[0].Child, function(o) { return o == name; });
          if(childTest.length === 0){
            updatedList[0].Child=[...updatedList[0].Child,name]
          }
          
          
            try {
              db.collection("Entity").doc(name).set(entityCreateData)
            .then(() => {
              db.collection("Entity").doc(entity).set(updatedList[0])
              .then(() => {
                  console.log("Document successfully written!");
                  dispatch(setEntityDeviceDataUpdater(true));
              })
              .catch((error) => {
                  console.error("Error writing document: ", error);
              });
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
              // let createData = await addEntity(entityCreateData);
          
              refreshEntityTable();
              handleClose();
            } catch (ex) {
              console.log(ex)
              handleClose();
            }
            
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Create New Entity
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid container item xs={6}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Address"
                    margin="normal"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.address}
                    variant="outlined"
                  />
                      <TextField
                    error={Boolean(touched.state && errors.state)}
                    fullWidth
                    helperText={touched.state && errors.state}
                    label="State"
                    margin="normal"
                    name="state"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.state}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={6}>
                  <FormControl
                    className={classes.formControl}
                    style={{
                      width: '100%',
                      'margin-top':
                        errors.role && touched.role ? '25px' : '16px',
                      'margin-bottom': '8px'
                    }}
                  >
                    <select
                      fullWidth
                      name="entity"
                      value={values.entity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        display: 'block',
                        padding: '18px',
                        width: '100%',
                        'border-radius': '5px',
                        border:
                          errors.entity && touched.entity
                            ? '1px solid red'
                            : '1px solid #c4c4c4',
                        color: errors.entity && touched.entity ? 'red' : 'black'
                      }}
                    >
                      <option value="" label="Select parent Entity" />
                      {
                        entityList.map((item) => {
                          let { entity } = item;
                          return (<option value={entity} label={entity} />)
                        })
                      }
                    </select>
                    {errors.entity && touched.entity && (
                      <div
                        className="input-feedback"
                        style={{
                          color: 'red',
                          'font-family':
                            '"Roboto", "Helvetica", "Arial", sans-serif',
                          'font-size': '0.75rem',
                          'margin-left': '14px',
                          'margin-right': '14px'
                        }}
                      >
                        {errors.entity}
                      </div>
                    )}
                  </FormControl>
                  <TextField
                    error={Boolean(touched.city && errors.city)}
                    fullWidth
                    helperText={touched.city && errors.city}
                    label="City"
                    margin="normal"
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.city}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.pin && errors.pin)}
                    fullWidth
                    helperText={touched.pin && errors.pin}
                    label="Pin"
                    margin="normal"
                    name="pin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.pin}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid container item xs={6}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid container item xs={6}>
                  <Button
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Create Entity
        </Button>
        <Modal
          disableEscapeKeyDown="true"
          disableBackdropClick="true"
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Box>
      <Box mt={3}></Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  entityList: PropTypes.array,
  refreshEntityTable: PropTypes.func,
};

export default Toolbar;
