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

const Results = ({ className, templates, ...rest }) => {
  const classes = useStyles();
  const [selectedTemplateIds, setSelectedTemplateIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedTemplateIds;

    if (event.target.checked) {
      newSelectedTemplateIds = templates.map((template) => template.id);
    } else {
      newSelectedTemplateIds = [];
    }

    setSelectedTemplateIds(newSelectedTemplateIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedTemplateIds.indexOf(id);
    let newSelectedTemplateIds = [];

    if (selectedIndex === -1) {
      newSelectedTemplateIds = newSelectedTemplateIds.concat(selectedTemplateIds, id);
    } else if (selectedIndex === 0) {
      newSelectedTemplateIds = newSelectedTemplateIds.concat(selectedTemplateIds.slice(1));
    } else if (selectedIndex === selectedTemplateIds.length - 1) {
      newSelectedTemplateIds = newSelectedTemplateIds.concat(selectedTemplateIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedTemplateIds = newSelectedTemplateIds.concat(
        selectedTemplateIds.slice(0, selectedIndex),
        selectedTemplateIds.slice(selectedIndex + 1)
      );
    }

    setSelectedTemplateIds(newSelectedTemplateIds);
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
                  Name
                </TableCell>
                <TableCell>
                  Auth Type
                </TableCell>
                <TableCell>
                  Attribute
                </TableCell>
              
                <TableCell>
                  Registration date
                </TableCell>
                <TableCell>
                 Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates.slice(0, limit).map((template) => (
                <TableRow
                  hover
                  key={template.id}
                  selected={selectedTemplateIds.indexOf(template.id) !== -1}
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
                        {template.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {template.authtype}
                  </TableCell>
             
                  <TableCell>
                    {template.attribute}
                  </TableCell>
                   <TableCell>
                    {moment(template.createdAt).format('DD/MM/YYYY')}
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
        count={templates.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  templates: PropTypes.array.isRequired
};

export default Results;
