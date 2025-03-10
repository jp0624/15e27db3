import React from 'react';
import { createRoot } from 'react-dom/client';
import { CallProvider } from './context/CallContext';
import App from './App';

import './styles/index.scss'

const rootElement = document.getElementById('app');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CallProvider>
      <App />
    </CallProvider>
  </React.StrictMode>
);