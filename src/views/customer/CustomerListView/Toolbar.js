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
import { useAuth } from "src/contexts/AuthContext";
import { auth, db } from '../../../firebase';
import {setUserUpdater} from '../../../redux/action'
import { useSelector, useDispatch } from 'react-redux';
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

const Toolbar = ({ className, entityList, refreshUserList, ...rest }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { addUser } = useAuth();
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
          onSubmit={async (values, actions) => {
            let { name, role, mobile, email, entity } = values;
            let userData = {
              'Name': name,
              'Role': role,
              'Contact': mobile,
              'Email': email,
              'Entity': entity,
              'createdOn':new Date()
            }

            try {
              db.collection("User").doc(email).set(userData)
              .then(() => {
                  console.log("Document successfully written!");
                  dispatch(setUserUpdater(true));
              })
              .catch((error) => {
                  console.error("Error writing document: ", error);
              });
              // await addUser(userData);
              refreshUserList();
              handleClose();
            } catch (ex) {
              handleClose();
            }
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
                  Add New User
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
                      <option value="Admin" label="Admin" />
                      <option value="User" label="User" />
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
                      {
                        entityList.map((item) => {
                          let { entity } = item;
                          return (<option value={entity} label={entity} />)
                        })
                      }
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
          Add User
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
                placeholder="Search User"
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
  className: PropTypes.string,
  entityList: PropTypes.array,
  refreshUserList: PropTypes.func
};

export default Toolbar;
