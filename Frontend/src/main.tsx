import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

// Axios is included to interface with the Backend
const localhostBackendPort = 7500;
import axios from 'axios';
axios.defaults.baseURL = `http://localhost:${localhostBackendPort}/api/v1`; // Default BackEnd Server Api
axios.defaults.withCredentials = true; // helps with the exchange of cookies

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, serif',
    allVariants: { color: 'white' },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-center" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
