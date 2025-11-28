import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App.jsx';
import './index.css';
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Outfit, Inter, system-ui, -apple-system, sans-serif',
  primaryColor: 'indigo',
  defaultRadius: 'md',
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        fw: 500,
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        withBorder: true,
      },
    },
  },
  headings: {
    fontFamily: 'Outfit, Inter, system-ui, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.5rem', lineHeight: '1.4' },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" limit={3} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);