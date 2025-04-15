import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import App from './App.jsx';
import { MovieProvider } from './context/MovieContext.jsx'; //  Import your provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieProvider> {/*  Wrap the whole app */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MovieProvider>
  </StrictMode>,
);

