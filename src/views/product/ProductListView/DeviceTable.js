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
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const DeviceTable = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
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
        <Box minWidth={1050}>
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
                Frame Count
                </TableCell>
                <TableCell>
               Date
                </TableCell>
                <TableCell>
                DC Bus
                </TableCell>
              <TableCell>
              DC Current
                </TableCell>
                <TableCell>
                DC Power
                </TableCell>
                <TableCell>
                Motor Voltage
                </TableCell>
                <TableCell>
                Motor Current
                </TableCell>
                <TableCell>
                Frequency
                </TableCell>
                <TableCell>
                IGBT Temp
                </TableCell>
                <TableCell>
                Motor status
                </TableCell>
                <TableCell>
                System Fault
                </TableCell>
                <TableCell>
                All system Fault
                </TableCell>
                <TableCell>
                RPM
                </TableCell>
                <TableCell>
                Energy
                </TableCell>
                <TableCell>
                Liter Per Minute
                </TableCell>
                <TableCell>
                Total Water Flow
                </TableCell>
                <TableCell>
                signal quality
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { (limit > 0
                ? customers.slice(page * limit, page * limit + limit)
                : customers
              ).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    /> */}
                  {/* </TableCell>  */}
                  <TableCell >
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                  
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.Fcnt}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {(customer.Time.split(' ')[0])}
                  </TableCell>

                   <TableCell>
                    {(customer.DB/10)}
                  </TableCell>

                
                    <TableCell>
                    {(customer.DC/10)}
                  </TableCell>
                    <TableCell>
                    {(customer.OP/100)}
                  </TableCell>
                    <TableCell>
                    {(customer.OV/10)}
                  </TableCell>
                  <TableCell>
                    {(customer.OC/10)}
                  </TableCell>
                  <TableCell>
                    {(customer.Temp/10)}
                  </TableCell>
                  <TableCell>
                    {customer.Stat}
                  </TableCell>
                  <TableCell>
                    {customer.SF}
                  </TableCell>
                  <TableCell>
                    {customer.ASF}
                  </TableCell>
                  <TableCell>
                    {customer.RPM}
                  </TableCell>
                  <TableCell>
                    {(customer.Fr/100)}
                  </TableCell>
                  <TableCell>
                    {customer.Energy}
                  </TableCell>
                  <TableCell>
                    {customer.LPM}
                  </TableCell>
                  <TableCell>
                    {customer.TWF}
                  </TableCell>
                  <TableCell>
                    {customer.CSQ}
                  </TableCell>
                </TableRow>
              ))}
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

DeviceTable.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default DeviceTable;
