import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  alpha
} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { fade, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import EditIcon from '@material-ui/icons/Edit';

import DeleteIcon from '@material-ui/icons/Delete';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    EditIcon: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

//import { alpha } from '@material-ui/core/styles';


// [
//   {
//     id: 1,
//     entity: 'India',
//     users: 20,
//     devices: 50,
//     type: 'adult',
//   },
//   {
//     id: 2,
//     entity: 'Karnataka',
//     users: 20,
//     devices: 50,
//     type: 'adult',
//     parentId: 1,
//   },
//   {
//     id: 3,
//     entity: 'Kerala',
//     users: 20,
//     devices: 50,
//     type: 'child',
//     parentId: 1,
//   },
//    {
//     id: 4,
//     entity: 'Bangalore',
//     users: 20,
//     devices: 50,
//     type: 'child',
//     parentId: 2,
//   },
//     {
//     id: 5,
//     entity: 'Madiwala',
//     users: 20,
//     devices: 50,
//     type: 'child',
//     parentId: 4,
//   },
//   {
//     id: 6,
//     entity: 'Cochin',
//     users: 20,
//     devices: 50,
//     type: 'child',
//     parentId: 3,
//   },
  
// ]

const ProfileDetails = ({ className, entityList, ...rest }) => {


  return (
    <MaterialTable
   title=''
      data={entityList}
      columns={[
        { title: 'Entity', field: 'entity' },
        { title: 'Users', field: 'users' },
        { title: 'Device', field: 'devices' },
      ]}
      parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      options={{
        selection: true,
        actionsColumnIndex: -1,
        search: false
      }}
      icons={tableIcons}
       actions={[
        {
          icon: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        rowData => ({
          icon: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
          tooltip: 'Delete User',
          onClick: (event, rowData) => alert("You want to delete " + rowData.name),
          disabled: rowData.birthYear < 2000
        })
      ]}
      onSelectionChange={rows => {
        // alert("Selected id is:  " + rows[0].id);
      }}
    />
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  entityList: PropTypes.array
};

export default ProfileDetails;
