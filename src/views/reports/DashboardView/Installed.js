import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    marginBottom: '10px'
  },
  avatar: {
    // backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  avatarImage: {
    backgroundColor: 'white',
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Installed = ({ className,data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item xs={12} spacing={3}>
            <Typography align='center' color="textSecondary" gutterBottom variant="h6">
              Total Installed Pumps
            </Typography>
            <Typography align='center' color="textPrimary" variant="h3">
              {data}
            </Typography>
            <Typography align='center' color="textSecondary" gutterBottom variant="h6">
              Total Water Delivered
            </Typography>
            <Typography align='center' color="textPrimary" variant="h3">
              {data}
            </Typography>
          </Grid>
          {/* <Grid item>
            <Avatar className={classes.avatar}>
              <img
                src="/static/installed.png"
                className={classes.avatarImage}
              />
            </Avatar>
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
};

Installed.propTypes = {
  className: PropTypes.string,
  data: PropTypes.string
};

export default Installed;
