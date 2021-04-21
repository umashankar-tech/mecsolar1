/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Link as RouterLink, useHistory  } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {TrendingUp, Devices } from '@material-ui/icons';
import Logo from '../../../components/Logo';
import DashboardIcon from '@material-ui/icons/Dashboard';

import styles from "../../../assets/jss/material-dashboard-react/components/sidebarStyle.js";
import routes from '../../../router.js'
const useStyles = makeStyles(styles);
const items = [
  {
    href: '/app/dashboard',
    icon: DashboardIcon,
    title: 'Dashboard',
    submenu: [],
  },
    {
    href: '/app/account',
    icon: TrendingUp,
    title: 'Entity',
    submenu: [],
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Users',
    submenu: []
  },
  {
    href: '/app/devices',
    icon: Devices,
    title: 'Devices',
    submenu: [],
  }
];
export default function NavBar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color="gray", image,open, logoText,rtlActive=true } = props;

  var links = (
    <List className={classes.list}>
      {items.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes['black']]: activeRoute(prop.href)
        });
     
        return (
          <NavLink
            to={prop.href}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}  style={{backgroundColor:activeRoute(prop.href)&&'rgb(85 167 206)'}}>
              {typeof prop.icon === "string" ? (
                <Icon
                style={{color:'white'}}
                  className={classNames(classes.itemIcon)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                style={{color:'white'}}
                  className={classNames(classes.itemIcon)}
                />
              )}
              <ListItemText
                primary={prop.title}
                style={{color:'white'}}
                className={classNames(classes.itemText)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div style={{height:62}}>
      <RouterLink to="/">
        <div style={{alignSelf:'center'}}>
         <Logo style={{width:100,height:50,marginTop:5,marginLeft:60}}/>
        </div></RouterLink>
    </div>
  );
  return (
    <div style={{zIndex:5}}>
      <Hidden mdUp implementation="css">
        <Drawer
        
          variant="temporary"
          anchor={"right" }
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}  style={{backgroundColor:'#0a2d43'}}>
            {/* {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />} */}
            {links}
          </div>
        
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"right"}
          variant="permanent"
          open
         
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div    className={classes.sidebarWrapper} style={{backgroundColor: '#0a2d43'}} >{links}</div>
        
        </Drawer>
      </Hidden>
    </div>
  );
}

NavBar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
