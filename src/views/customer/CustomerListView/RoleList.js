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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const RoleList = ({ className, roles, ...rest }) => {
  const classes = useStyles();
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedRoleIds;

    if (event.target.checked) {
      newSelectedRoleIds = roles.map((role) => role.id);
    } else {
      newSelectedRoleIds = [];
    }

    setSelectedRoleIds(newSelectedRoleIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRoleIds.indexOf(id);
    let newSelectedRoleIds = [];

    if (selectedIndex === -1) {
      newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds.slice(1));
    } else if (selectedIndex === selectedRoleIds.length - 1) {
      newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRoleIds = newSelectedRoleIds.concat(
        selectedRoleIds.slice(0, selectedIndex),
        selectedRoleIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRoleIds(newSelectedRoleIds);
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
               
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Users
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.slice(0, limit).map((role) => (
                <TableRow
                  hover
                  key={role.id}
                  selected={selectedRoleIds.indexOf(role.id) !== -1}
                >
                 
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                  
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {role.role}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {role.description}
                  </TableCell>
             
                  <TableCell>
                    {role.users}
                  </TableCell>
                   <TableCell>
                    {role.status}
                  </TableCell>
                   <TableCell>
                    <EditIcon />
                    <DeleteIcon />
                  </TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={roles.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RoleList.propTypes = {
  className: PropTypes.string,
  roles: PropTypes.array.isRequired
};

export default RoleList;
