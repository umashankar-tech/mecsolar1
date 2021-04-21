import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Container,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Search as SearchIcon } from 'react-feather';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  error: {
    border: '1px solid red',
    color: 'red'
  }
}));

const ToolbarRole = ({ className, ...rest }) => {
  // const navigate = useNavigate();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            role: '',
            decription: ''
          }}
          validationSchema={Yup.object().shape({
            decription: Yup.string().max(255).required('Name is required'),
            role: Yup.string().max(255).required('Role is required')
          })}
          onSubmit={() => {
            // navigate('/app/dashboard', { replace: true });
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Add New Role
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid container item xs={6}>
                  <TextField
                    error={Boolean(touched.role && errors.role)}
                    fullWidth
                    helperText={touched.role && errors.role}
                    label="Role"
                    margin="normal"
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.role}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={6}>
                  <TextField
                    error={Boolean(touched.decription && errors.decription)}
                    fullWidth
                    helperText={touched.decription && errors.decription}
                    label="Description"
                    margin="normal"
                    name="decription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.decription}
                    variant="outlined"
                  />
                </Grid>
                
              </Grid>

              <Grid container spacing={1}>
                <Grid container item xs={6}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid container item xs={6}>
                  <Button
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add Role
        </Button>
        <Modal
          disableEscapeKeyDown="true"
          disableBackdropClick="true"
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Role"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

ToolbarRole.propTypes = {
  className: PropTypes.string
};

export default ToolbarRole;
