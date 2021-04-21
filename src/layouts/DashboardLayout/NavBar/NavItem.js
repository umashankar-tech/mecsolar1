import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles,
  Collapse,
  List,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';

import ExpandMore from '@material-ui/icons/ExpandMore';
import {PersonAdd, Lock, SupervisorAccount, TrendingUp } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  submenu,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  const handleClick = () => {
    setOpen(!open);
  };
  const renderSwitch = (param) => {
  switch(param) {
    case 'PersonAdd':
      return <PersonAdd />;
    case 'Lock':
      return <Lock />;
    case 'SupervisorAccount':
      return <SupervisorAccount />;
    default:
      return <SupervisorAccount />;
  }
};
  return (
    <div>

    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
      onClick={handleClick}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && (
          <Icon
            className={classes.icon}
            size="20"
          />
        )}
        <span className={classes.title}>
          {title}
        </span>
      </Button>
      {open ? submenu.length>0 ? <ExpandLess /> : '' : submenu.length>0 ? <ExpandMore /> : ''}
    </ListItem>
    {submenu.length>0 ?
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {submenu.map((item) => (
            <ListItem button className={classes.nested} component="a" href={item.href}>
            <ListItemIcon>
            {renderSwitch(item.icon)} 
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
          ))}
         
        </List>
      </Collapse>
      :'' }
    </div>

  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  submenu: PropTypes.object
};

export default NavItem;
