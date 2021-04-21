import React, { useState } from 'react';
import { Box, Grid, Paper, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import DeviceTable from './DeviceTable';
import Toolbar from './Toolbar';
import Card from './Card/Card.js';
import moment from 'moment';
import CardHeader from './Card/CardHeader.js';
import _ from 'lodash';
import {
  VictoryArea,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis
} from 'victory';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CardView = ({ data, updatedDate }) => {
  const classes = useStyles();
  // data=[...data,{Fcnt:'30',CSQ:'0',DB:'0',DC:'0',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'0',Stat:'0',RT:'0:0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:19',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'}]
  if (data.length > 9) {
    data = _.slice(data, 0, 9)
  }
  let hours = 0;
  let mins = 0;
  const [customers] = useState(data);
  const csqData = data.map((val, index) => {
    return { x: index, y: val.CSQ };
  });
  var count = data.length + 1;
  var dbData = [];
  var dcData = [];
  var opData = [];
  var ovData = [];
  var ocData = [];
  var frData = [];
  var tempData = [];
  var stat = [];
  var rtData = [];
  var rpmData = [];
  var enerygyData = [];
  var lpmData = [];
  var twfData = [];
  data.map((val, index) => {
    count -= 1;
    dbData.push({ x: count, y: (val.DB / 10) });
    dcData.push({ x: count, y: (val.DC) / 10 });
    opData.push({ x: count, y: (val.OP) / 1 });
    ovData.push({ x: count, y: (val.OV / 10) });
    ocData.push({ x: count, y: (val.OC / 10) });
    frData.push({ x: count, y: (val.Fr / 100) });
    tempData.push({ x: count, y: (val.Temp / 10) });
    stat.push({ x: count, y: val.Stat });
    let tim = val.RT.split(':')
    let retval = 0;
    if (mins != 0) {
      retval = (parseInt(tim[1]) / 60) + parseInt(tim[0]);

    }
    else {
      retval = parseInt(tim[0]);
    }
    rtData.push({ x: count, y: retval });
    rpmData.push({ x: count, y: (val.RPM) / 1 })
    enerygyData.push({ x: count, y: (val.Energy) / 1 })
    lpmData.push({ x: count, y: (val.LPM) / 1 });
    twfData.push({ x: count, y: (val.TWF) / 1 })
  });



  return (
    // <Page  title="Customers">
    //   <Container maxWidth={false}>
    <div style={{ backgroundColor: 'white', paddingTop: 15 }}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  DC Bus
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '40%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  V
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '30%'
                  }}
                >
                  {(data[0].DB / 10)}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>
              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 300,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={dbData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={dbData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>


        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{

                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  DC Current
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '15%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  A
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '50%'
                  }}
                >
                  {data[0].DC / 10}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>

              </div>

              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  // width={500}
                  style={{}}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={dcData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={dcData}
                  />
                </VictoryChart>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',

                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Frequency
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '15%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  Hz
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '67%'
                  }}
                >
                  {(data[0].Fr / 100)}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>
              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 300,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={frData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={frData}
                  />
                </VictoryChart>
              </div>
            </div>


          </Paper>
        </Grid>
      </Grid>



      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 18,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'

                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Motor Voltage
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '9%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  V
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '30%'
                  }}
                >
                  {(data[0].OV / 10)}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>

              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={ovData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={ovData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>


        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 18,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Motor Current
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '9%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  A
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '50%'
                  }}
                >
                  {(data[0].OC / 10)}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>
              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 300,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={ocData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={ocData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 18,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Output Power
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '9%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  kW
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '67%'

                  }}
                >
                  {data[0].OP}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>

              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={opData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={opData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Temperature
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '9%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  °C
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '30%'
                  }}
                >
                  {(data[0].Temp / 10)}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>

              </div>
              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 300,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={tempData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={tempData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>


        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Flow speed
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '14%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  LPM
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '50%'
                  }}
                >
                  {data[0].LPM}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>

              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={lpmData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={lpmData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Speed
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '38%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  RPM
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '67%'
                  }}
                >
                  {data[0].RPM}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>

              </div>
              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 300,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={rpmData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={rpmData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'

                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Run Time
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '14%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  Hr:Mn
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '30%'
                  }}
                >
                  {data[0].RT}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>

              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={rtData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={rtData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>


        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Energy
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',

                    paddingBottom: 20,
                    paddingLeft: '27%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  KWh
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '50%'
                  }}
                >
                  {data[0].Energy}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>
              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 300,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={enerygyData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={enerygyData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url('/static/cardbk.png')`,
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                height: 103,
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    // fontFamily: 'verdana',
                    padding: 3,
                    paddingBottom: 20,
                    textShadow: '2px 1px 3px black'
                  }}
                  baseFontStyle={{ fontFamily: "Roboto" }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                >
                  Total Flow
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    // fontWeight: 'bold',

                    fontFamily: 'verdana',
                    display: 'flex',
                    paddingBottom: 20,
                    paddingLeft: '14%',
                    textShadow: '2px 1px 3px black'
                  }}
                >
                  m<p style={{ paddingBottom: 5, fontSize: 10 }}>3</p>
                </p>
                <p
                  className={classes.cardCategory}
                  style={{

                    color: '#e88321',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 22,
                    fontWeight: 'bold',

                    left: '67%'
                  }}
                >
                  {data[0].TWF}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 70,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {'Last updated on'}
                </p>
                <p
                  className={classes.cardCategory}
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginTop: 81,
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingLeft: 5

                  }}
                >
                  {moment(updatedDate).format('h:mm a').toString()}
                </p>
              </div>

              <div style={{ marginTop: -20 }}>
                <VictoryChart
                  height={150}
                  width={500}
                  // style={{ height: 200, width: 50 }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 100 }
                  }}
                >
                  {/* <VictoryLine
                    style={{
                      grid: { stroke: 'white', strokeWidth: 0.5 },
                      data: { stroke: 'white', strokeWidth: 4 },
                      parent: { border: '1px solid #ccc' }
                    }}
                    data={twfData}
                  /> */}
                  <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent' },
                      ticks: { stroke: 'transparent' },
                      tickLabels: { fill: 'transparent' }
                    }}
                  />
                  <VictoryArea
                    style={{ data: { fill: '#f2777733' } }}
                    data={twfData}
                  />
                </VictoryChart>
              </div>
            </div>

          </Paper>
        </Grid>
      </Grid>



    </div>

    //   </Container>
    // </Page>
  );
};

export default CardView;
