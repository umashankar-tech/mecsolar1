import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import {  useHistory  } from 'react-router-dom';
import getInitials from 'src/utils/getInitials';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const ProductCard = ({ className,customers,  ...rest }) => {
  const classes = useStyles();
  // const customers = useSelector(
  //   (state) => state.product.entityDeviceData
  // );
  // const [customers,setCustomers] = useState(reduxEntityDeviceData)
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  let history = useHistory();
  console.log('shiva',customers)
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.DevID);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={900}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Unique ID
                </TableCell>
           
                <TableCell>
                  Name
                </TableCell>
              <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Signal Strength
                </TableCell>
                <TableCell>
                  Entity
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              // customers.slice(0, limit)
              
              (limit > 0
                ? customers.slice(page * limit, page * limit + limit)
                : customers
              ).map((customer) =>  {
          let temp ={}
             
              if(customer.Telemetry.length >0){
                
                var b = customer.Telemetry[0].replace(/'/g, '"');
                 console.log('Sachin', b)
                temp= JSON.parse(b)
              }
             
             
             
                return(
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.DevID) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.DevID) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.DevID)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell  >
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                  <div onClick={()=>history.push(`/app/devicedetails/${customer.DevID}`)}>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        
                        {customer.DevID}
                      </Typography>
                      </div>
                    </Box>
                  </TableCell>
              

                   <TableCell>
                    {customer.DisplayName}
                  </TableCell>

                  <TableCell>
                    {/* {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`} */}
                  {customer.Location}
                  </TableCell>
                    <TableCell>
                      <>
                    {temp.CSQ && parseInt(temp.CSQ)<10 &&
                    <img src="/static/red.png" style={{height:40,width:40,marginLeft:15}} />
                    }  
                      {temp.CSQ && parseInt(temp.CSQ)>=10 && parseInt(temp.CSQ)<15 &&
                    <img src="/static/2yellow.png" style={{height:50,width:50,marginLeft:15}} />
                    } 
                       {temp.CSQ && parseInt(temp.CSQ)>=15 && parseInt(temp.CSQ)<20 &&
                    <img src="/static/3orange.png" style={{height:50,width:50,marginLeft:15}} />
                    } 
                       {temp.CSQ && parseInt(temp.CSQ)>=20  &&
                    <img src="/static/green.png" style={{height:40,width:40,marginLeft:15}} />
                    }  
                    </>
                  </TableCell>
                    <TableCell>
                    {customer.Entity}
                  </TableCell>
                    <TableCell>
                    {temp.Stat && parseInt(temp.Stat) == 1 &&
                    <img src="/static/on.png" style={{height:30,width:50}} />
                    }  
                      {temp.Stat && parseInt(temp.Stat) == 0 &&
                    <img src="/static/off.png" style={{height:30,width:50}} />
                    } 
                  </TableCell>
                  
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default ProductCard;
