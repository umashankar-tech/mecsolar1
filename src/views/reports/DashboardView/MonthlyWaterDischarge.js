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
    height: '100%'
  },
  avatar: {
    //backgroundColor: colors.red[600],
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

const MonthlyWaterDischarge = ({ className,data, ...rest }) => {
  const classes = useStyles();

  return (
      <Card className={clsx(classes.root, className)} {...rest} style={{"margin": "0px 0px 20px 0px","padding": "16px"}}>
      <CardContent>
      <Grid container justify="center" spacing={2}>
          <Grid item>
            <Typography align='center' color="textSecondary" gutterBottom variant="h4">
              Total Pumps
            </Typography>       
          </Grid>
        </Grid>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography align="center" color="textSecondary" gutterBottom variant="h6">
              ON :
            </Typography>
            
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h3">
              {data}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography align="center" color="textSecondary" gutterBottom variant="h6">
              OFF :
            </Typography>
            
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h3">
              {data}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MonthlyWaterDischarge.propTypes = {
  className: PropTypes.string,
  data: PropTypes.string
};

export default MonthlyWaterDischarge;
