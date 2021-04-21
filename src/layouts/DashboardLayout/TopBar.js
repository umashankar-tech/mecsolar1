import React from "react";
import classNames from "classnames";
import { Link as RouterLink, useNavigate ,useLocation} from 'react-router-dom';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
// import AdminNavbarLinks from "./AdminNavbarLinks.js";
// import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "./components/CustomButtons/Button.js";
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import styles from "../../assets/jss/material-dashboard-react/components/headerStyle.js";
import APP_ROUTES from '../../routes.js'
const useStyles = makeStyles(styles);


export default function TopBar(props) {
  const classes = useStyles();
  const location = useLocation();
  function makeBrand() {
    var name;
    let rrId = location.pathname
    APP_ROUTES.map(prop => {
    
   
if(rrId == prop.path){
      name = prop.name;
      }
      if(location.pathname.split('/')[2] == 'devicedetails'){
        name='Device Detail'
      }
    });
   
    return <p style={{fontSize:22,fontFamily: 'verdana',paddingLeft: 256,textDecorationLine: 'underline'}}>{name}{'  '}</p>;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes['red']]: true
  });
  const handleMenu = () => {
    props.onMenuclick('left', true);            
}
  return (
    <AppBar className={classes.appBar }>
      <Toolbar className={classes.container}>
      <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
       
          </Button>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
         
        </div>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleClickProfile}
            style={{marginRight:40,borderRadius:50,color:'#1673ad',padding:3}}
          >
          {/* <div
         > */}
          <NotificationsNoneIcon style={{padding:3,height:30,width:30}}/>
          {/* </div> */}
</IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleClickProfile}
            style={{marginRight:30,borderRadius:50,color:'#1673ad',padding:3}}
          >
         
            <MailOutlineIcon style={{padding:3,height:30,width:30}}/>
       
            </IconButton>
          <AdminNavbarLinks />
          <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenu}
          >
            <Menu />
          </IconButton>
          </Hidden>
      </Toolbar>
      
    </AppBar>
  );
}

TopBar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
