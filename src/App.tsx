import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import MetricSelector from './components/MetricSelector';
import Dashboard from './components/Dashboard';

import apolloClient from './apolloSetup';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (

  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={apolloClient}>
      <Wrapper>
        <Header />
        <ToastContainer />
        <MetricSelector />
        <Dashboard />
      </Wrapper>
    </ApolloProvider>

  </MuiThemeProvider>
);

export default App;
