import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
// import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './../src/redux/store';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { AuthProvider } from 'src/contexts/AuthContext';
import AppRouter from 'src/router';

const App = () => {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
    </Provider>
  );
};

export default App;
