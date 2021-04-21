import React, { useState } from 'react';
import { Box, Container, makeStyles,Grid,Paper } from '@material-ui/core';
import Page from 'src/components/Page';
import DeviceTable from './DeviceTable';
import Toolbar from './Toolbar';
import ArcProgress from 'react-arc-progress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const GaugeView = ({ data }) => {
  const classes = useStyles();
  const [customers] = useState(data);
  const dbprogress = (data.DB/10) / 800;
  const dbtext = (data.DB/10).toString();
  const dcprogress = data.DC / 250;
  const dctext = (data.DC/10).toString();
  const ovprogress = (data.OV/10) / 380;
  const ovtext = (data.OV/10).toString();

  const ocprogress = (data.OC/10) / 20;
  const octext = (data.OC/10).toString();
  const rpmprogress = data.RPM / 3300;
  const rpmtext = (data.RPM).toString();
  const frprogress = (data.Fr/100) / 1200;
  const frtext = (data.Fr/100).toString();
  const tempprogress = (data.Temp/10) / 110;
  const temptext = (data.Temp/10).toString();
  const opprogress = (data.OP/100) / 25;
  const optext = (data.OP/100).toString();
  const lpmprogress = data.OP / 25;
  const lpmtext = (data.OP).toString();
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
             style={{
              background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
              height: 120,
              // width: 160,
              borderRadius: 10
            }}
          >
      
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                DC BUS
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
                <ArcProgress
                style={{height:110,width:110}}
                  progress={dbprogress}
                  text={dbtext}
                  textStyle={{size:'32px',
                    color: 'white',
                    
                  }}
               
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {}}
                />
              </div>
  
         
          </Paper>
        </Grid>
        
       
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
             style={{
              background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
              height: 120,
              borderRadius: 10
            }}
          >
        
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                DC Current
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
               <ArcProgress
                style={{height:110,width:110}}
                  progress={dcprogress}
                  text={dctext}
                  textStyle={{size:'32px',
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 'bold'
                  }}
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {}}
                />
              </div>
          
         
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
           style={{
            background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
            height: 120,
            borderRadius: 10
          }}
          >
        
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                Motor Voltage
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
               <ArcProgress
                style={{height:110,width:110}}
                  progress={ovprogress}
                  text={ovtext}
                  textStyle={{size:'32px',
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 'bold'
                  }}
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {}}
                />
              </div>
      
       
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
             style={{
              background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
              height: 120,
              borderRadius: 10
            }}
          >
        
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                Motor Current
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
               <ArcProgress
                style={{height:110,width:110}}
                  progress={ocprogress}
                  text={octext}
                  textStyle={{size:'32px',
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 'bold'
                  }}
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {
                    //   console.log('animationEnd', progress, text);
                  }}
                />
              </div>
         
        
          </Paper>
        </Grid>
        </Grid>

        <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
              style={{
                background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
                height: 120,
                borderRadius: 10
              }}
          >
   
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                RPM
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
               <ArcProgress
                style={{height:110,width:110}}
                  progress={rpmprogress}
                  text={rpmtext}
                  textStyle={{size:'32px',
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 'bold'
                  }}
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {}}
                />
              </div>
       
          
          </Paper>
        </Grid>
        
       
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
              style={{
                background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
                height: 120,
                borderRadius: 10
              }}
              >
     
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                Frequency
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
               <ArcProgress
                style={{height:110,width:110}}
                  progress={frprogress}
                  text={frtext}
                  textStyle={{size:'32px',
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 'bold'
                  }}
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {}}
                />
              </div>
       
      
        
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
            style={{
              background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
              height: 120,
              borderRadius: 10
            }}
            >
      
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                Temperature
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
               <ArcProgress
                style={{height:110,width:110}}
                  progress={tempprogress}
                  text={temptext}
                  textStyle={{size:'32px',
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 'bold'
                  }}
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {}}
                />
              </div>
       
         
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}
               style={{
                background: 'linear-gradient(to right,#FC575E ,#1FD1F9)',
                height: 120,
                borderRadius: 10
              }}>
     
              <p
                className={classes.cardCategory}
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10
                }}
              >
                Power
              </p>

              <div style={{ marginTop: -10, paddingLeft: 5 }}>
               <ArcProgress
                style={{height:110,width:110}}
                  progress={opprogress}
                  text={optext}
                  textStyle={{size:'32px',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 'bold'
                  }}
                  observer={(current) => {
                    const { percentage, currentText } = current;
                  }}
                  animationEnd={({ progress, text }) => {}}
                />
              </div>
       
        
          </Paper>
        </Grid>
        </Grid>


      
  
      
      </Container>
    </Page>
  );
};

export default GaugeView;
