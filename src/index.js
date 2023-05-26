import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
const { BrowserWindow } = require('electron');
const win = new BrowserWindow();
win.webContents.openDevTools();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
