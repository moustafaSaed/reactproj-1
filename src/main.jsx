import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { HelmetProvider } from 'react-helmet-async'
import '../src/darkmode.css';
import { DataProvider } from './Context/Context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </HelmetProvider>
  </React.StrictMode>
)
