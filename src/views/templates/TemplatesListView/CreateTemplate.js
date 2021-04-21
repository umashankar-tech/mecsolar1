import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import data from './data';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}
function renderRow(props) {
  const { index, style } = props;

  return (
    <List dense="true">
      <ListItem button style={style} key={index}>
        <ListItemAvatar>
          <Avatar>
            <ReceiptIcon color="secondary"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Attribute ${index + 1}`} />
        <DeleteIcon />
      </ListItem>
    </List>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};
const CreateTemplate = () => {
  // const navigate = useNavigate();
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Formik
          initialValues={{
            name: '',
            email: 'demo@demo.com',
            password: 'Password123',
            mobile: ''
          }}
          validationSchema={Yup.object().shape({
            mobile: Yup.string().required('Phone number is not valid'),
            name: Yup.string().required('Name is required'),
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
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
                <Typography color="textPrimary" variant="h2">
                  Create Template
                </Typography>
              </Box>

              <Grid container spacing={1}>
                <Grid container item xs={4}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Template Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={4}>
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    fullWidth
                    helperText={touched.description && errors.description}
                    label="Description"
                    margin="normal"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.description}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={4}>
                  <TextField
                    error={Boolean(touched.authtype && errors.authtype)}
                    fullWidth
                    helperText={touched.authtype && errors.authtype}
                    label="Auth Type"
                    margin="normal"
                    name="authtype"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.authtype}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid container item xs={3}></Grid>
                <Grid container item xs={3}></Grid>
                <Grid container item xs={3}></Grid>
                <Grid container item xs={3}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Attributes
                </Typography>
              </Box>

              <Grid container spacing={1}>
                <Grid container item xs={2}>
                  <TextField
                    error={Boolean(touched.attributename && errors.attributename)}
                    fullWidth
                    helperText={touched.attributename && errors.attributename}
                    label="Attribute Name"
                    margin="normal"
                    name="attributename"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.attributename}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={2}>
                   <FormControl
                    className={classes.formControl}
                    style={{
                      width: '100%',
                      'margin-top': errors.datatype && touched.datatype ? '25px' : '16px',
                      'margin-bottom': '8px'
                    }}
                  >
                    <select
                      fullWidth
                      name="role"
                      value={values.datatype}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        display: 'block',
                        padding: '18px',
                        width: '100%',
                        'border-radius': '5px',
                        border: errors.datatype && touched.datatype ? '1px solid red' : '1px solid #c4c4c4',
                        color: errors.datatype && touched.datatype ? 'red' : 'black',
                        background: '#f4f6f8'
                      }}
                      
                    >
                      <option value="" label="Select a Data Type" />
                      <option value="1" label="String" />
                      <option value="2" label="Number" />
                      <option value="3" label="Object" />
                    </select>
                    {errors.datatype && touched.datatype && (
                      <div className="input-feedback" style={{ color: 'red','font-family': '"Roboto", "Helvetica", "Arial", sans-serif','font-size':'0.75rem','margin-left':'14px','margin-right':'14px' }}>
                        {errors.datatype}
                      </div>
                    )}
                  </FormControl>
                  
                </Grid>
                <Grid container item xs={2}>
                  <TextField
                    error={Boolean(touched.attributedescription && errors.attributedescription)}
                    fullWidth
                    helperText={touched.attributedescription && errors.attributedescription}
                    label="Description"
                    margin="normal"
                    name="attributedescription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.attributedescription}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="small"
                    type="submit"
                    variant="contained"
                    style={{ height: '50px', margin: '15px' }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  style={{ background: 'white', border: '2px solid lightgray' }}
                >
                  <FixedSizeList
                    height={300}
                    width={'100%'}
                    itemSize={46}
                    itemCount={2}
                  >
                    {renderRow}
                  </FixedSizeList>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </Page>
  );
};

export default CreateTemplate;
