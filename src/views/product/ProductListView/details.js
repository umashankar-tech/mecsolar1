import React, { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate ,useLocation} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { Select } from '@material-ui/core';
import moment from 'moment';
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
  Typography,
  withStyles
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector, useDispatch } from 'react-redux';
import CardView from './CardView';
import Page from 'src/components/Page';
import CustomTabs from "../../reports/DashboardView/components/CustomTabs/CustomTabs.js";
import LiveLineChart from './liveChart';
import ProductCard from './ProductCard';
import Toolbar from './Toolbar';
import data from './data';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import { getCookie } from 'src/utils/cookie';
import * as Yup from 'yup';
import Chart from 'react-apexcharts';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Map from './Map';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
import Tasks from './Tasks/Tasks';
import mqtt, { MqttClient } from 'mqtt';
import ProductList from './ProductList';
import GaugeView from './GaugeView';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '30vh',
    width: '100%'
  },
  control: {
    padding: theme.spacing(0)
  },
  label: {
    marginLeft: '0px'
  },
  formgroup: {
    marginTop: '15px'
  },
  gridDeviceDetailsContainer: {
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  detailsPaperRoot: {
    display: 'flex',
    textAlign: 'center'
  },
  gridGraphContainer: {
    backgroundColor: '#a7a2a2',
    marginTop: '15px'
  },
  graphContainer: {
    padding: theme.spacing(2),
    minWidth: '140px'
  },
  gridGraphContainerChart: {
    backgroundColor: 'white'
  },
  gridMotorStatus: {
    marginTop: '10px'
  },
  gridMotorStatusImage: {
    marginTop: '15px'
  },
  gridMotorPipe: {
    marginTop: '50px'
  },
  gridMotorConfigure: {
    backgroundColor: '#bbbbf7',
    margin: '15px',
    padding: '35px'
  },
  gridConfigureOptions: {
    padding: '40px'
  },
  gridConfigureButtonContainer: {
    textAlign: 'center',
  }
}));
const configureData =[
  {name:'Control Loc',add:'2200'},
  {name:'Main Speed Ref',add:'2201'},
  {name:'Frequency Max',add:'2202'},
  {name:'Frequency Min',add:'2208'},
 {name:'Base Frequency',add:'2203'},
 {name:'Rating',add:'2204'},
 {name:'Control Type',add:'2205'},
 {name:'Rated Current',add:'2206'},
 {name: 'Rated Voltage',add:'2207'},
 {name:'Ramp Up Time',add:'2209'},
 {name:'Ramp Dn Time',add:'220B'},
 {name: 'Min DC Level',add:'220C'},
 {name: 'Low DC Limit',add:'220C'},
 {name:'Torque Boost',add:'220D'},
 {name:'Delta V Step',add:'220E'},
 {name:'PMControl+',add:'220F'},
 {name:'O/P Current Limit',add:'2210'},
 {name:'OL Percent',add:'2211'},
 {name: 'Serial Timeout',add:'2212'},
 {name:'Pole Paris',add:'2213'},
 {name: 'RS Phase Resistance',add:'2214'},
 {name: 'Ld Inductance',add:'2215'},
 {name:'Lq Inductance',add:'2216'},
 {name:'Ke Constant',add:'2217'},
 {name:'Kt Constant',add:'2218'},
 {name:'Rotor Inertia',add:'2219'},
 {name:'Speed KP Gain',add:'221A'},
 {name:'Speed KI Gain',add:'221B'},
 {name:'D Current KP Gain',add:'221C'},
 {name:'D Current KI Gain',add:'221D'},
 {name:'Q Current KP Gain',add:'221E'},
 {name:'Q Current KI Gain',add:'221F'},














{name:' CUR Calibr AC',add:'2220'},
{name:'PWR Calibr V/F Mode',add:'2221'},
{name:'PWR Calibr PMSM Mode',add:'2222'},
{name:'PV / DC CUR Calibr',add:'2223'},
{name:'DC PWR Calibr',add:'2224'},
{name:'DCV Calib',add:'2225'},
{name:'StartUp Cur',add:'2226'},
{name:'FOC Start Ramp',add:'2227'},
{name:'Align Voltage',add:'2228'},
{name:'Min RPM PMSM',add:'2229'},
{name:'Out Relay Function',add:'222A'},
{name:'Speed Freq',add:'222B'},
{name:'Speed Damping',add:'222C'},
{name:'Current frequency',add:'222D'},
{name:'Current Damping',add:'222E'},
{name:'ID Run',add:'222F'},
{name:'Password',add:'2230'},
{name:'Max Back EMF Voltage',add:'2231'},
{name:'Mode Select',add:'2232'},
{name:'Set to Default',add:'2233'},
{name:'Motor Direction',add:'2234'},
{name:'FAULT Enable/ Disable bits',add:'2235'},
{name:'MPPT Start Rate',add:'2236'},
{name:'DC Stabilization',add:'2237'},
{name:'PhaseLoss dV',add:'2238'},
{name:'Dry Run Power',add:'2239'},
{name:'Dry Run Frequency',add:'223A'},
{name:'D Pul KP Gain',add:'223B'},
{name:'D Pul KI Gain',add:'223C'},
{name:'Q Pul KP Gain',add:'223D'},
{name:'Q Pul KI Gain',add:'223E'}]
const demodata = [{Fcnt:'30',CSQ:'15.0',DB:'298',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'41.1',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:19',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'14.0',DB:'298.6',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:29',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'12.0',DB:'0',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:39',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'18.0',DB:'298.6',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:49',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'19.0',DB:'298.6',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:59',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'12.0',DB:'o',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:29',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'13.0',DB:'298.6',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:39',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'14.0',DB:'298.6',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:49',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'},
{Fcnt:'30',CSQ:'15.0',DB:'0',DC:'1',OP:'0',OV:'0',OC:'0',Fr:'0',Temp:'401',Stat:'0',RT:'0',SF:'0',ASF:'0',RPM:'0',Energy:'0',LPM:'0',TWF:'0',Time:'21/03/06 07:11:59',Loc:'0F000000_0F000000',IMEI:'866910032929419',DEVID:'0',IO:'0',ADC:'0'}
]
const GreenCheckbox = withStyles({
  root: {
    padding: '5px'
  },
  checked: {}
})((props) => (
  <Checkbox color="default" {...props} style={{ marginLeft: '0px' }} />
));

const DeviceDetails = ({ className, ...rest }) => {
var liveData = [];
var liveData2 = [];
const location = useLocation();
const [currentGrid,setCurrentGrid] = useState('card')
const reduxEntityDeviceData = useSelector(
  (state) => state.product.entityDeviceData
);
let rrId = location.pathname.split('/')[3]
let selVal = reduxEntityDeviceData.filter(k => k.DevID == rrId)
let selVal5 = reduxEntityDeviceData.filter(k => k.DevID == 'dfg')
let tele=[];
selVal && selVal[0]&& selVal[0].Telemetry.map((vals)=>{
  let b= vals.replace(/'/g, '"');
  tele.push(JSON.parse(b))
}) 

const [stateLive,setStateLive]=useState([])
const [stateLive2,setStateLive2]=useState([])
useEffect(() => {
  let rrId = location.pathname.split('/')[3]
let selVal = reduxEntityDeviceData.filter(k => k.DevID == rrId)

let tele=[];
selVal && selVal[0]&& selVal[0].Telemetry.map((vals)=>{
  let b= vals.replace(/'/g, '"');
  tele.push(JSON.parse(b))
})

// if(stateLive.length == 0){
  setStateLive2(tele)


},[reduxEntityDeviceData])
let [updatedDate,setUpdatedDate]= useState(new Date())
const [valueCon, setValueCon] = useState('');
const [valueConSelect,setValueConSelect] =  useState('');
  const classes = useStyles();
  var client;
  const checkBox = [
    'DC Bus voltage',
    'DC Current',
    'DC Power',
    'Motor Voltage',
    'Motor Current',
    'Frequency',
    'RPM',
    'IGBT-Temp',
    'Energy',
    'Water flow(LPM)'
  ];

  const handleChange = (event) => {
    setValueCon(event.target.value);
  };
  const handleChangeSel = (event) => {

    setValueConSelect(event.target.value);
  };
  const handleConfigure =()=>{
    let a = parseInt(valueCon)
    let finalStr = valueConSelect+a.toString(16)
    if(finalStr.length == 1){
      finalStr='000'+finalStr;
    }
    if(finalStr.length == 2){
      finalStr='00'+finalStr;
    }
    if(finalStr.length == 3){
      finalStr='0'+finalStr;
    }

    let loggedinUser=getCookie('_loggedinUser')
    let diId = location.pathname.split('/')[3]
   
   
    if(selVal.length >0){
   let  client2 = mqtt.connect('wss://broker.mqttdashboard.com:8000/mqtt');
    console.log('goutham',client2)
    client2.on('connect', function () {
      client2.subscribe('test1/data', function (err) {
        console.log('handleClick1',err)
        if (!err) {
          let tempData=JSON.stringify({"DEV_ID":diId,"IMEI":selVal[0].IMEI,"DATA_LEN":"0","SOURCE":"WEB","USER":loggedinUser,"UTC_TIME":new Date().toLocaleString(),"CMD_TYPE":"02","CMD_DATA":finalStr})
          console.log('handleClick1',err)
          console.log('handleClick2',tempData)
          client2.publish('test1/data',tempData, function (err1) {
            console.log('handleClick',err1)
          })
  
        }
      })
    })
    // client2.end()
   }
  
  }
  useEffect(()=>{
    // var myMqtt = new MqttClient();
  
    let subVal= ('device/telemetry/'+location.pathname.split('/')[3])
    console.log('location.pathname',subVal)
    client = mqtt.connect('wss://broker.mqttdashboard.com:8000/mqtt');
    console.log('connected client',client)
    client.on("connect",  ()=>{
     
      client.subscribe(subVal,  (err)=> {
        if (!err) {
            console.log('subscribed successfully')
          // client.publish('test/data/1', 'Hello mqtt')
        }
      })
    })
    client.on('message',  (topic, message)=> {
    
      let newData=JSON.parse(message.toString().replace(/'/g, '"'));
      console.log('newData',newData)
      liveData=[newData,...liveData]
  
      setStateLive(liveData)
      setUpdatedDate(new Date())
      // client.end()
    })
  },[])
  // useEffect(()=>{
  //   let rrId2 = location.pathname.split('/')[3]
  //     let selVal2 = reduxEntityDeviceData.filter(k => k.DevID == rrId2)
      
  //     let tele2=[];
  //     selVal2 && selVal2[0]&& selVal2[0].Telemetry.map((vals)=>{
  //       let b= vals.replace(/'/g, '"');
  //       tele2.push(JSON.parse(b))
  //     })
     
  // },[reduxEntityDeviceData])
 const handleClick =()=>{
  let loggedinUser=getCookie('_loggedinUser')
  let diId = location.pathname.split('/')[3]
 if(selVal.length >0){
  let client3 = mqtt.connect('wss://broker.mqttdashboard.com:8000/mqtt');
  let str = 
  client3.on('connect', function () {
    client3.subscribe('test1/data', function (err) {
      console.log('handleClick1',err)
      if (!err) {
        let tempData=JSON.stringify({"DEV_ID":diId,"IMEI":selVal[0].IMEI,"DATA_LEN":"0","SOURCE":"WEB","USER":loggedinUser,"UTC_TIME":new Date,"CMD_TYPE":"01","CMD_DATA":"OFF"})
  
        client3.publish('test1/data',tempData, function (err1) {
          console.log('handleClick',err1)
        })

      }
    })
  })
  // client3.end()
 }



}
let temp = (tele.length >0?tele[0].CSQ:(stateLive2[0] &&stateLive2[0].CSQ && stateLive2[0].CSQ))
let mapData = [];
mapData.push({
  clr:tele.length >0?(tele[0].Stat):stateLive2[0] && stateLive2[0].Stat ,
  name: location.pathname.split('/')[3],
  location: { lat: (tele.length >0?parseFloat(tele[0].Loc.split('_')[0]):stateLive2[0] && stateLive2[0].Loc &&parseFloat( (stateLive2[0].Loc).split('_')[0])), lng:  (tele.length >0?parseFloat(tele[1].Loc.split('_')[1]):stateLive2[1] && stateLive2[1].Loc &&parseFloat( (stateLive2[1].Loc).split('_')[1])) }
});

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={8}>
            <Grid
              container
              spacing={0}
              classes={{
                root: classes.gridDeviceDetailsContainer
              }}
            >
              {[
                'Farmer Name:'+(selVal[0]&& selVal[0].farmerName ? selVal[0].farmerName :'-')+', Device Name:'+(selVal[0]&& selVal[0].DisplayName ? selVal[0].DisplayName:'-')+', Device IMEI:'+(selVal[0]&& selVal[0].IMEI ? selVal[0].IMEI : '-'),
                (moment(new Date()).format('DD/MM/YYYY h:mm a').toString())+'\n Signal:',
                tele.length >0?'Latitude: '+tele[0].Loc.split('_')[0]+', Longitude'+tele[0].Loc.split('_')[1]:stateLive2[0] && stateLive2[0].Loc && (stateLive2[0].Loc).split('_')[0]+'/'+(stateLive2[0].Loc).split('_')[1]
              ].map((value,index) => (
                <Grid key={value} item xs={4}>
                  <Paper className={classes.paper} style={{height:100,display:'flex'}} variant="outlined" square classes={{
                root: classes.detailsPaperRoot
              }}>
                   <Typography
                      color="textPrimary"
                      variant="h4"
                      align="center"
                      maxWidth={true}
                      
                      style={{ margin: index==2?0:15,marginTop:index==2?0:20, width:index==2?'100%': '80%',fontSize:16 }}
                    >
                      {index != 2 && value}
                      {index == 1 &&<>
                   
                   {temp && parseInt(temp)<10 &&
                   <img src="/static/red.png" style={{height:40,width:40,marginLeft:15}} />
                   }  
                     {temp && parseInt(temp)>=10 && parseInt(temp)<15 &&
                   <img src="/static/2yellow.png" style={{height:50,width:50,marginLeft:15}} />
                   } 
                      {temp && parseInt(temp)>=15 && parseInt(temp)<20 &&
                   <img src="/static/3orange.png" style={{height:50,width:50,marginLeft:15}} />
                   } 
                      {temp && parseInt(temp)>=20  &&
                   <img src="/static/green.png" style={{height:40,width:40,marginLeft:15}} />
                   }  
                   </>}
                   {index == 2 &&<Map location={location} zoomLevel={4} mapData={mapData} />}
                   {index == 0 && <InfoOutlinedIcon style={{position:'absolute',marginTop:-75,marginLeft:80}}/>}
                    </Typography>
                     
                      
              
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              classes={{
                root: classes.gridGraphContainer
              }}
            >
           
           <Grid container 
           style={{
            background: 'linear-gradient(to right,#141e30 ,#243b55)',
           }}
           >
        <Grid item xs={6} sm={3} onClick={()=>{setCurrentGrid('card')}}>
          <Paper className={classes.paper} style={{height:50,paddingTop:15,textAlign:'center',
        backgroundColor:'transparent',color:'white'}}>
         CARD
          </Paper>
        </Grid>
        
       
        <Grid item xs={6} sm={3} onClick={()=>{setCurrentGrid('gauge')}}>
          <Paper className={classes.paper} style={{height:50,paddingTop:15,textAlign:'center',
        backgroundColor:'transparent',color:'white'}}>
          GAUGE
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3} onClick={()=>{setCurrentGrid('table')}}>
          <Paper className={classes.paper} style={{height:50,paddingTop:15,textAlign:'center',
        backgroundColor:'transparent',color:'white'}}>
          TABLE
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper} style={{height:50,paddingTop:15,textAlign:'center',
        backgroundColor:'transparent',color:'gray'}}>
          GRAPH
          </Paper>
        </Grid>
        </Grid>
              <Grid
                item
                xs={12}
                classes={{
                  root: classes.gridGraphContainerChart
                }}>
                  {currentGrid =='card' && stateLive2.length>0 && <CardView data={stateLive.length>0 ?[...stateLive,...stateLive2]:[...stateLive2]} updatedDate={updatedDate}></CardView>}
          {currentGrid =='gauge' && <>{stateLive.length==0 ? <>{stateLive2.length>0 && <GaugeView data={stateLive2[0]} ></GaugeView> }</>:
<GaugeView data={stateLive[0]} ></GaugeView>
                  }</>}
                  {currentGrid =='table' && stateLive2.length>0 &&  <ProductList data={stateLive.length>0 ?[...stateLive,...stateLive2]:[...stateLive2]}></ProductList>}
  
        </Grid>
        
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            classes={{
              root: classes.gridMotorStatus
            }}
          >
            <Grid>
              <Typography
                color="textPrimary"
                variant="h4"
                align="center"
                maxWidth={true}
                style={{ margin: 'auto' }}
              >
                Motor Status
              </Typography>
            </Grid>

            <Grid
              spacing={2}
              classes={{
                root: classes.gridMotorStatusImage
              }}
            >
             <div  onClick={handleClick}>
              <img
                alt="Logo"
                src="/static/power_off.svg"
                style={{
                  display: 'block',
                  width: '65px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
              </div>
            </Grid>
            <Grid
              classes={{
                root: classes.gridMotorPipe
              }}
            >
              <img
                alt="Logo"
                src="/static/pipe.png"
                style={{
                  display: 'block',
                  width: '35%',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
            </Grid>
            <Grid
              classes={{
                root: classes.gridMotorConfigure
              }}
            >
              <Typography
                color="textPrimary"
                variant="h2"
                align="center"
                maxWidth={true}
                style={{ margin: 'auto' }}
              >
                Configure
              </Typography>
             
              <Grid
              style={{padding:10}}
                // classes={{
                //   root: classes.gridConfigureOptions
                // }}
              >
                <select
                  fullWidth
                  name="entity"
                  style={{
                    display: 'block',
                    padding: '18px',
                    width: '100%',
                    'border-radius': '5px'
                  }}
                  onChange={handleChangeSel}
                  value={valueConSelect}
                >
                  <option value="" label="Select options" />
                  {
                        configureData.map((item) => {
                         
                          return (<option value={item.add} label={item.name} />)
                        })
                      }
                </select>
              </Grid>
              <Grid
            // classes={{
            //   root: classes.gridConfigureOptions
            // }}
            style={{padding:10,paddingLeft:20}}
            >
             <TextField id="outlined-basic" label="Configure data" variant="outlined" 
              value={valueCon}
              onChange={handleChange}/>
            </Grid>
              <Grid classes={{
                  root: classes.gridConfigureButtonContainer
                }}
                justify="flex-end" >
                <Button  onClick={()=>handleConfigure()} variant="contained" color="secondary" style={{'marginBottom': '10px'}}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DeviceDetails;
