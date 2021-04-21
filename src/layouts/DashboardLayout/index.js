import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, useNavigate ,useLocation} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const location = useLocation();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
const onMenuclick = (anchor, open) => (event) => {

  setMobileOpen(!mobileOpen);
    }
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  return (
    <div className={classes.root} >
      {/* {location.pathname.split('/')[2] != 'devicedetails' && */}
      <TopBar onMobileNavOpen={() => setMobileOpen(true)} onMenuclick={onMenuclick()}/>
  {/* } */}
      <NavBar
     
      handleDrawerToggle={handleDrawerToggle}
      
        open={mobileOpen}
      />
     
      <div className={classes.wrapper} style={{paddingTop:(location.pathname.split('/')[2] == 'devicedetails'?64:64)}}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
           {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
