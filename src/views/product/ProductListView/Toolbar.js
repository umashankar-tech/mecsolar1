import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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
    padding: theme.spacing(2, 4, 3),
  },
}));

const Toolbar = ({ className,searchFetch, show=true, ...rest}) => {
  // const navigate = useNavigate();
  let history = useHistory();
  const classes = useStyles();
   const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    history.push('/app/createdevice');
    // navigate('/app/createdevice', { replace: true });
  };

  const handleClose = () => {
    // navigate('/app/createdevice', { replace: true });
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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
  const handleChanger =(event)=>{
  
    searchFetch(event.target.value)
  }
    const body = (
    <div style={modalStyle} className={classes.paper}>
      
      <Container maxWidth="sm">
   
       
    
          <Formik
            initialValues={{
              name: '',
              email: 'demo@demo.com',
              password: 'Password123',
              mobile:'',
            }}
            validationSchema={Yup.object().shape({
              mobile: Yup.string().required('Phone number is not valid'),
              name: Yup.string().required('Name is required'),
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
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
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                  Create Device
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
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
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
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      { show &&<Box
        display="flex"
        justifyContent="flex-end"
      >
     
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          Create Device
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
      </Box>}
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search User"
                variant="outlined"
                onChange={handleChanger}
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
