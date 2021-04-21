import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import _ from 'lodash';
import FormControl from '@material-ui/core/FormControl';
import Page from 'src/components/Page';
import ProductCard from './ProductCard';
import Toolbar from './Toolbar';
import data from './data';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth, db } from '../../../firebase';
import {setEntityDeviceDataUpdater} from '../../../redux/action'
import { useSelector, useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),

  }
}));

const CustomerListView = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [customers] = useState(data);
  let entityValues = [];
  const [entityList,setEntityList] = useState([]);
  const reduxEntityData = useSelector(
    (state) => state.product.entityData
  );
  const fetchEntityData = async () => {
    // let entity = await fetchEntitys();
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
  let history = useHistory();

  useEffect(() => {
    fetchEntityData();
  },[reduxEntityData])
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false} style={{'width':'70%'}}>
        <Formik
          initialValues={{
          DevID:'',
          DisplayName:'',
          installedClient:'',
          farmerName:'',
          clientAddress:'',
          farmerAddress:'',
          clientContact:'',
          farmerContact:'',
          installedDate:'',
          adhaarNumber:'',
          Entity:'',
          IMEI:'',
          motorMake:'',
          controllerMake:'',
          motorRating:'',
          controllerRating:'',
          pumpHead:'',
          installedGPSLoc:'',
          pumpType:'',
          pvPanelMake:'',
          motorPumpCategory:'',
          pvPanelWattage:'',
          pumpSerialNumber:'',
          pvArrayWattage:'',
          motorSerialNumber:'',
          connectedNumber:''
          }}
          validationSchema={Yup.object().shape({
            
            DevID:Yup.string().required('Device ID is required'),
            DisplayName:Yup.string().required('Device name is required'),
            installedClient:Yup.string().required('Installed Client is required'),
            farmerName:Yup.string().required('Farmer Name is required'),
            clientAddress:Yup.string().required('Client Address is required'),
            farmerAddress:Yup.string().required('Farmer Address is required'),
            clientContact:Yup.string().required('Client Contact is required'),
            farmerContact:Yup.string().required('Farmer Contact is required'),
            installedDate:Yup.date().required('Installed Date is required'),
            adhaarNumber:Yup.string().required('Adhaar Number is required'),
            Entity:Yup.string().required('Entity is required'),
            IMEI:Yup.string().required('Motor IMEI is required'),
            motorMake:Yup.string().required('Motor Make is required'),
            controllerMake:Yup.string().required('Controller Make is required'),
            motorRating:Yup.string().required('Motor Rating is required'),
            controllerRating:Yup.string().required('Controller Rating is required'),
            pumpHead:Yup.string().required('Pump Head is required'),
            installedGPSLoc:Yup.string().required('Installed GPS Location is required'),
            pumpType:Yup.string().required('Pump Type is required'),
            pvPanelMake:Yup.string().required('PV Panel Make is required'),
            motorPumpCategory:Yup.string().required('Motor Pump Category is required'),
            pvPanelWattage:Yup.string().required('PV Panel Wattage is required'),
            pumpSerialNumber:Yup.string().required('Pump Serial Number is required'),
            pvArrayWattage:Yup.string().required('PV Array Wattage is required'),
            motorSerialNumber:Yup.string().required('Motor Serial Number is required'),
            connectedNumber:Yup.string().required('Connected Number is required')
          })}
          onSubmit={async (values, actions)=>{
            console.log('/app/devices',values)
            const {    DevID,DisplayName,
              installedClient,
              farmerName,
              clientAddress,
              farmerAddress,
              clientContact,
              farmerContact,
              installedDate,
              adhaarNumber,
              Entity,
              IMEI,
              motorMake,
              controllerMake,
              motorRating,
              controllerRating,
              pumpHead,
              installedGPSLoc,
              pumpType,
              pvPanelMake,
              motorPumpCategory,
              pvPanelWattage,
              pumpSerialNumber,
              pvArrayWattage,
              motorSerialNumber,
              connectedNumber}= values;

            let deviceCreateData ={
              DevID,
              DisplayName,
              installedClient,
              farmerName,
              clientAddress,
              farmerAddress,
              clientContact,
              farmerContact,
              installedDate,
              adhaarNumber,
              Entity,
              IMEI,
              motorMake,
              controllerMake,
              motorRating,
              controllerRating,
              pumpHead,
              installedGPSLoc,
              pumpType,
              pvPanelMake,
              motorPumpCategory,
              pvPanelWattage,
              pumpSerialNumber,
              pvArrayWattage,
              motorSerialNumber,
              connectedNumber,Telemetry:[]
            }
            console.log('/app/devices',deviceCreateData)
            let updatedList= _.filter(reduxEntityData, function(o) { return o.Name == Entity; });
       
            let childTest= _.filter(updatedList[0].Devices, function(o) { return o == DevID; });
            if(childTest.length === 0){
              updatedList[0].Devices=[...updatedList[0].Devices,DevID];
              updatedList[0].device_count+=1; 
            }
            try {
              db.collection("Device").doc(DevID).set(deviceCreateData)
            .then(() => {
              db.collection("Entity").doc(Entity).set(updatedList[0])
              .then(() => {
                dispatch(setEntityDeviceDataUpdater(true));
                history.push('/app/devices');
              })
              .catch((error) => {
                  console.error("Error writing document: ", error);
              });
           
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
              // let createData = await addEntity(entityCreateData);
          
             
           
            } catch (ex) {
              console.log(ex)
             
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
                  Create Device
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h4">
                  Farmer Details
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid container item xs={6}>
                  <TextField
                    error={Boolean(touched.installedClient && errors.installedClient)}
                    fullWidth
                    helperText={touched.installedClient && errors.installedClient}
                    label="Installed Client"
                    margin="normal"
                    name="installedClient"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.installedClient}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.clientAddress && errors.clientAddress
                    )}
                    fullWidth
                    helperText={touched.clientAddress && errors.clientAddress}
                    label="Client Address"
                    margin="normal"
                    name="clientAddress"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.clientAddress}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.clientContact && errors.clientContact
                    )}
                    fullWidth
                    helperText={touched.clientContact && errors.clientContact}
                    label="Client Contact"
                    margin="normal"
                    name="clientContact"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.clientContact}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.installedDate && errors.installedDate
                    )}
                    fullWidth
                    disableToolbar
                    helperText={touched.installedDate && errors.installedDate}
                    // defaultValue="2017-05-24"
                    label="Installed Date"
                    margin="normal"
                    name="installedDate"
                  
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="date"
                    value={values.installedDate}
                    variant="outlined"
                    format="MM/dd/yyyy"
                    id="date"
    InputLabelProps={{
      shrink: true,
    }}
                  />
                    {/* <TextField
                    error={Boolean(touched.Entity && errors.Entity)}
                    fullWidth
                    helperText={touched.Entity && errors.Entity}
                    label="Entity"
                    margin="normal"
                    name="Entity"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.Entity}
                    variant="outlined"
                  /> */}
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
                      name="Entity"
                      value={values.Entity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        display: 'block',backgroundColor:'transparent',
                        padding: '18px',
                        width: '100%',
                        'border-radius': '5px',
                        border:
                          errors.Entity && touched.Entity
                            ? '1px solid red'
                            : '1px solid #c4c4c4',
                        color: errors.Entity && touched.Entity ? 'red' : 'black'
                      }}
                    >
                      <option value="" label="Entity" />
                      {
                        entityList.map((item) => {
                          let { entity } = item;
                          return (<option value={entity} label={entity} />)
                        })
                      }
                    </select>
                    {errors.Entity && touched.Entity && (
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
                        {errors.Entity}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid container item xs={6}>
                  <TextField
                    error={Boolean(touched.farmerName && errors.farmerName)}
                    fullWidth
                    helperText={touched.farmerName && errors.farmerName}
                    label="Farmer Name"
                    margin="normal"
                    name="farmerName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.farmerName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.farmerAddress && errors.farmerAddress
                    )}
                    fullWidth
                    helperText={touched.farmerAddress && errors.farmerAddress}
                    label="Farmer Address"
                    margin="normal"
                    name="farmerAddress"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.farmerAddress}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.farmerContact && errors.farmerContact
                    )}
                    fullWidth
                    helperText={touched.farmerContact && errors.farmerContact}
                    label="Farmer Contact"
                    margin="normal"
                    name="farmerContact"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.farmerContact}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.adhaarNumber && errors.adhaarNumber)}
                    fullWidth
                    helperText={touched.adhaarNumber && errors.adhaarNumber}
                    label="Aadhar Number"
                    margin="normal"
                    name="adhaarNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.adhaarNumber}
                    variant="outlined"
                  />
                
                <TextField
                    error={Boolean(touched.IMEI && errors.IMEI)}
                    fullWidth
                    helperText={touched.IMEI && errors.IMEI}
                    label="Device IMEI"
                    margin="normal"
                    name="IMEI"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.IMEI}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h4">
                  Pump Details
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid container item xs={6}>
                <TextField
                    error={Boolean(touched.DevID && errors.DevID)}
                    fullWidth
                    helperText={touched.DevID && errors.DevID}
                    label="Device ID"
                    margin="normal"
                    name="DevID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.DevID}
                    variant="outlined"
                  />
                <TextField
                    error={Boolean(touched.motorMake && errors.motorMake)}
                    fullWidth
                    helperText={touched.motorMake && errors.motorMake}
                    label="Motor Make"
                    margin="normal"
                    name="motorMake"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.motorMake}
                    variant="outlined"
                  />
                    <TextField
                    error={Boolean(touched.motorRating && errors.motorRating)}
                    fullWidth
                    helperText={touched.motorRating && errors.motorRating}
                    label="Motor Rating"
                    margin="normal"
                    name="motorRating"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.motorRating}
                    variant="outlined"
                  />
                  
                       <TextField
                    error={Boolean(touched.pumpHead && errors.pumpHead)}
                    fullWidth
                    helperText={touched.pumpHead && errors.pumpHead}
                    label="Pump Head"
                    margin="normal"
                    name="pumpHead"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.pumpHead}
                    variant="outlined"
                  />
                           <TextField
                    error={Boolean(touched.pumpType && errors.pumpType)}
                    fullWidth
                    helperText={touched.pumpType && errors.pumpType}
                    label="Motor Pump Type"
                    margin="normal"
                    name="pumpType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.pumpType}
                    variant="outlined"
                  />
                                 <TextField
                    error={Boolean(touched.motorPumpCategory && errors.motorPumpCategory)}
                    fullWidth
                    helperText={touched.motorPumpCategory && errors.motorPumpCategory}
                    label="Motor Pump Category"
                    margin="normal"
                    name="motorPumpCategory"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.motorPumpCategory}
                    variant="outlined"
                  />
                                        <TextField
                    error={Boolean(touched.pumpSerialNumber && errors.pumpSerialNumber)}
                    fullWidth
                    helperText={touched.pumpSerialNumber && errors.pumpSerialNumber}
                    label="Pump Serial Number"
                    margin="normal"
                    name="pumpSerialNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.pumpSerialNumber}
                    variant="outlined"
                  />
                                            <TextField
                    error={Boolean(touched.motorSerialNumber && errors.motorSerialNumber)}
                    fullWidth
                    helperText={touched.motorSerialNumber && errors.motorSerialNumber}
                    label="Motor Serial Number"
                    margin="normal"
                    name="motorSerialNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.motorSerialNumber}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={6}>
                <TextField
                    error={Boolean(touched.DisplayName && errors.DisplayName)}
                    fullWidth
                    helperText={touched.DisplayName && errors.DisplayName}
                    label="Display Name"
                    margin="normal"
                    name="DisplayName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.DisplayName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.controllerMake && errors.controllerMake)}
                    fullWidth
                    helperText={touched.controllerMake && errors.controllerMake}
                    label="Controller Make"
                    margin="normal"
                    name="controllerMake"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.controllerMake}
                    variant="outlined"
                  />
                    <TextField
                    error={Boolean(touched.controllerRating && errors.controllerRating)}
                    fullWidth
                    helperText={touched.controllerRating && errors.controllerRating}
                    label="Controller Rating"
                    margin="normal"
                    name="controllerRating"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.controllerRating}
                    variant="outlined"
                  />
                   <TextField
                    error={Boolean(touched.installedGPSLoc && errors.installedGPSLoc)}
                    fullWidth
                    helperText={touched.installedGPSLoc && errors.installedGPSLoc}
                    label="Installed GPS Location"
                    margin="normal"
                    name="installedGPSLoc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.installedGPSLoc}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.pvPanelMake && errors.pvPanelMake)}
                    fullWidth
                    helperText={touched.pvPanelMake && errors.pvPanelMake}
                    label="PV Panel Make"
                    margin="normal"
                    name="pvPanelMake"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.pvPanelMake}
                    variant="outlined"
                  />
                   <TextField
                    error={Boolean(touched.pvPanelWattage && errors.pvPanelWattage)}
                    fullWidth
                    helperText={touched.pvPanelWattage && errors.pvPanelWattage}
                    label="PV Panel Wattage"
                    margin="normal"
                    name="pvPanelWattage"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.pvPanelWattage}
                    variant="outlined"
                  />
                      <TextField
                    error={Boolean(touched.pvArrayWattage && errors.pvArrayWattage)}
                    fullWidth
                    helperText={touched.pvArrayWattage && errors.pvArrayWattage}
                    label="PV Array Wattage"
                    margin="normal"
                    name="pvArrayWattage"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.pvArrayWattage}
                    variant="outlined"
                  />
                       <TextField
                    error={Boolean(touched.connectedNumber && errors.connectedNumber)}
                    fullWidth
                    helperText={touched.connectedNumber && errors.connectedNumber}
                    label="No of PV Panel Connected"
                    margin="normal"
                    name="connectedNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.connectedNumber}
                    variant="outlined"
                  />
                
                </Grid>
                
              </Grid>
              <Grid container spacing={1}>
               
                <Grid container item xs={4}>
                 
                </Grid>
                 <Grid container item xs={4}>
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
                <Grid container item xs={4}>
                 
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </Page>
  );
};

export default CustomerListView;
