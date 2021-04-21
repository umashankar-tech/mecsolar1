import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Paper
} from '@material-ui/core';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Map from './Map';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEntityChild,
  addEntityDevice,
  addEntityDeviceTable,
  setEntityTable
} from '../../../redux/action';
import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

import _ from 'lodash';
import { getCookie } from 'src/utils/cookie';
const useStyles = makeStyles(styles);
const location = {
  address: 'Bengaluru, Karnataka',
  lat: 12.9538477,
  lng: 77.3507442
};

export default function Dashboard() {
  const classes = useStyles();

  const [entityChild, setEntityChild] = useState([]);
  const [completedQuery, setCompletedQuery] = useState(false);

  let entity1 = [];
  const reduxEntityChild = useSelector((state) => state.product.entityChild);
  const reduxEntityDeviceId = useSelector(
    (state) => state.product.entityDeviceIds
  );
  const reduxEntityDeviceData = useSelector(
    (state) => state.product.entityDeviceData
  );
  const reduxEntityData = useSelector((state) => state.product.entityData);
  const updatedTime = useSelector((state) => state.product.updatedTime);
  console.log(
    'updatedTime',
    moment(updatedTime).format('MMMM Do YYYY, h:mm:ss a')
  );
  let mapData = [];
  reduxEntityDeviceData.map((device) => {
    if (device.Telemetry.length > 0) {
      var b = device.Telemetry[0].replace(/'/g, '"');
      var c = JSON.parse(b);
      var dc = c.Loc.split('_');
      console.log('c.DevID----->', c.Stat);
      mapData.push({
        clr: c.Stat,
        name: device.DevID,
        location: { lat: parseFloat(dc[0]), lng: parseFloat(dc[1]) }
      });
    }
  });
  const getDeviceInfo = (val, type) => {
    let count = 0;
    let hours = 0;
    let mins = 0;
    let totTwf = 0;
    let totEng = 0;
    let totSF = 0;
    let totASF = 0;
    reduxEntityDeviceData.map((device) => {
      if (device.Telemetry.length > 0) {
        var b = device.Telemetry[0].replace(/'/g, '"');
        var c = JSON.parse(b);
        console.log('goutham----->', c.SF);
        if (type == 'on-off') {
          if (c.Stat == val) {
            count += 1;
          }
        }
        if (type == 'rt') {
          let tim = c.RT.split(':');
          hours += parseInt(tim[0]);
          mins += parseInt(tim[1]);
        }
        if (type == 'twf') {
          totTwf += parseInt(c.TWF);
        }
        if (type == 'eng') {
          totEng += parseInt(c.Energy);
        }
        if (type == 'sf') {
          if (c.SF != 0) {
            totSF += 1;
          }
        }
        if (type == 'asf') {
          if (c.ASF != 0) {
            totASF += 1;
          }
        }
      }
    });
    if (type == 'on-off') {
      return count;
    }
    if (type == 'rt') {
      let retval = 0;
      if (mins != 0) {
        retval = mins / 60 + hours;
        mins = mins % 60;
      }

      return retval + ':' + mins;
    }
    if (type == 'twf') {
      return totTwf;
    }
    if (type == 'eng') {
      return totEng;
    }
    if (type == 'sf') {
      return totSF;
    }
    if (type == 'asf') {
      return totASF;
    }
  };

  return (
    <div
      style={{
        flexGrow: 1,
        paddingLeft: 10,
        overflow: 'hidden',
        background: `url('https://mymecsolar.com/images/Slide-1.jpg')`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      }}
    >
      {/* <Container maxWidth="sm" > */}
      {/* <Hidden mdDown implementation="css"> */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div
            className={classes.paper}
            style={{ backgroundColor: 'transparent' }}
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    paddingLeft: 10,
                    marginTop: 20,
                    borderRadius: 5,
                    height: 107,
                    background: 'linear-gradient(to right,#800080 ,#fc67fa)',
                    boxShadow: '6px 5px 10px black'
                  }}
                >
                  <div style={{ textAlign: 'center', paddingTop: 10 }}>
                    <img
                      src="/static/motor.png"
                      style={{
                        height: '-webkit-fill-available',
                        paddingRight: 30
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        paddingLeft: 5,
                        // width: 150,
                        paddingTop: 60,
                        color: 'white',
                        width: 'max-content',
                        // fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Last updated on
                    </p>
                    <h3
                      style={{
                        paddingLeft: 5,
                        // marginTop: -10,
                        color: 'white',
                        // fontSize: 60,
                        fontFamily: 'verdana'
                      }}
                    >
                      {moment(updatedTime).format('h:mm a').toString()}
                    </h3>
                  </div>
                  <div style={{ width: '-webkit-fill-available' }}>
                    <p
                      style={{
                        paddingLeft: 5,
                        // width: 150,
                        paddingTop: 5,
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Total installed pumps
                    </p>
                    <h3
                      style={{
                        //  paddingLeft:'60%',
                        marginTop: -10,
                        color: 'white',
                        fontSize: 60,
                        fontFamily: 'verdana'
                      }}
                    >
                      {reduxEntityDeviceData.length}
                    </h3>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 20,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background:
                        'linear-gradient(to bottom,#14a76a,#56ab2f ,#a8e063)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        // paddingLeft: 20,

                        paddingTop: 5,
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Device
                    </p>
                    <p
                      style={{
                        // paddingLeft: 20,

                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Online
                    </p>
                    <h3
                      style={{
                        paddingTop: 25,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('1', 'on-off')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/motor.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 20,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background:
                        'linear-gradient(to bottom,#14a76a,#56ab2f ,#a8e063)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        // width: 50,
                        paddingTop: 5,
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Pumps ON
                    </p>
                    <h3
                      style={{
                        paddingTop: 40,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('1', 'on-off')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/on-off.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 20,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background: 'linear-gradient(to bottom, #ff5f6d,#ffc371)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      running
                    </p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      hours
                    </p>
                    <h3
                      style={{
                        paddingTop: 15,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('1', 'rt')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/motor.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 20,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background: 'linear-gradient(to bottom, #f56217,#ffc007)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      energy
                    </p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      generated
                    </p>
                    <h3
                      style={{
                        paddingTop: 15,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('1', 'eng')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/water1.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background:
                        'linear-gradient(to bottom,#dc281e,#f00000,#f85032)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        // paddingLeft: 20,

                        paddingTop: 5,
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Device
                    </p>
                    <p
                      style={{
                        // paddingLeft: 20,

                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Offline
                    </p>
                    <h3
                      style={{
                        paddingTop: 25,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('0', 'on-off')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/motor.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background:
                        'linear-gradient(to bottom,#dc281e,#f00000,#f85032)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        // width: 50,
                        paddingTop: 5,
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Pumps Off
                    </p>
                    <h3
                      style={{
                        paddingTop: 40,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('0', 'on-off')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/on-off.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background: 'linear-gradient(to bottom, #ff5f6d,#ffc371)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      water
                    </p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      pumped
                    </p>
                    <h3
                      style={{
                        paddingTop: 15,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('1', 'twf')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/water2.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                      textAlign: '-webkit-center',
                      borderRadius: 5,
                      height: 230,
                      background: 'linear-gradient(to bottom, #f56217,#ffc007)',
                      boxShadow: '6px 5px 10px black'
                    }}
                  >
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Faults
                    </p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'verdana'
                      }}
                    >
                      Reported
                    </p>
                    <h3
                      style={{
                        paddingTop: 25,
                        // marginTop: -15,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 26,

                        fontFamily: 'verdana'
                      }}
                    >
                      {getDeviceInfo('1', 'asf')}
                    </h3>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    >
                      <img
                        src="/static/water3.png"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            className={classes.paper}
            style={{
              borderRadius: 5,
              marginTop: 20,
              marginRight: 10,
              boxShadow: '6px 5px 10px black'
            }}
          >
            <Grid item xs={12}>
              <Map location={location} zoomLevel={4} mapData={mapData} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
