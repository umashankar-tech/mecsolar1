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

const Toolbar = ({ className, ...rest }) => {
  // const navigate = useNavigate();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    // navigate('/app/createtemplate', { replace: true });
  };

  const handleClose = () => {
    // navigate('/app/createtemplate', { replace: true });
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
            name: '',
            email: '',
            mobile: '',
            role: '',
            entity: ''
          }}
          validationSchema={Yup.object().shape({
            mobile: Yup.string().required('Phone number is not valid'),
            name: Yup.string().required('Name is required'),
            role: Yup.string().required('Role is required'),
            entity: Yup.string().required('Entity is required'),
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
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
                  Create New Template
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid container item xs={6}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.mobile && errors.mobile)}
                    fullWidth
                    helperText={touched.mobile && errors.mobile}
                    label="Mobile"
                    margin="normal"
                    name="mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.mobile}
                    variant="outlined"
                  />
                  
                </Grid>
                <Grid container item xs={6}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <FormControl
                    className={classes.formControl}
                    style={{
                      width: '100%',
                      'margin-top': errors.role && touched.role ? '25px' : '16px',
                      'margin-bottom': '8px'
                    }}
                  >
                    <select
                      fullWidth
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        display: 'block',
                        padding: '18px',
                        width: '100%',
                        'border-radius': '5px',
                        border: errors.role && touched.role ? '1px solid red' : '1px solid #c4c4c4',
                        color: errors.role && touched.role ? 'red' : 'black'
                      }}
                      
                    >
                      <option value="" label="Select a Role" />
                      <option value="1" label="Admin" />
                      <option value="2" label="User" />
                      <option value="3" label="Access" />
                    </select>
                    {errors.role && touched.role && (
                      <div className="input-feedback" style={{ color: 'red','font-family': '"Roboto", "Helvetica", "Arial", sans-serif','font-size':'0.75rem','margin-left':'14px','margin-right':'14px' }}>
                        {errors.role}
                      </div>
                    )}
                  </FormControl>
                </Grid>
<Grid container item xs={6}>
                <FormControl
                    className={classes.formControl}
                    style={{
                      width: '100%',
                      'margin-top': errors.role && touched.role ? '25px' : '16px',
                      'margin-bottom': '8px'
                    }}
                  >
                    <select
                      fullWidth
                      name="entity"
                      value={values.entity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        display: 'block',
                        padding: '18px',
                        width: '100%',
                        'border-radius': '5px',
                        border: errors.entity && touched.entity ? '1px solid red' : '1px solid #c4c4c4',
                        color: errors.entity && touched.entity ? 'red' : 'black'
                      }}
                      
                    >
                      <option value="" label="Select an Entity" />
                      <option value="1" label="Banglore" />
                      <option value="2" label="Kormangala" />
                      <option value="3" label="Sarjapura" />
                    </select>
                    {errors.entity && touched.entity && (
                      <div className="input-feedback" style={{ color: 'red','font-family': '"Roboto", "Helvetica", "Arial", sans-serif','font-size':'0.75rem','margin-left':'14px','margin-right':'14px' }}>
                        {errors.entity}
                      </div>
                    )}
                  </FormControl>
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
          Create Template
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
                placeholder="Search Template"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
