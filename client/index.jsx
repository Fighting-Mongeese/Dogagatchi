import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // imports bootstrap library
import App from './components/App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('app');
const root = createRoot(container);

const clientId = require('./components/assets/clientId.js');

root.render(<GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
    </GoogleOAuthProvider>);
