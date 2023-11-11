import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // imports bootstrap library
import App from './components/App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
//import { GOOGLE_CLIENT_ID } from '../server/config.js';

//const clientId = process.env.GOOGLE_CLIENT_ID
const container = document.getElementById('app');
const root = createRoot(container);

root.render(<GoogleOAuthProvider clientId='572626520755-sc2cnocp45um3rslcdclofdj0evrh9ei.apps.googleusercontent.com'>
    <React.StrictMode>
    <App />
    </React.StrictMode>
    </GoogleOAuthProvider>);
