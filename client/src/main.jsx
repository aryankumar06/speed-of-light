import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { AuthProvider } from './context/AuthContext';
import { PaperProvider } from './context/PaperContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PaperProvider>
          <App />
        </PaperProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
