import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // imports bootstrap library
import App from './components/App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<GoogleOAuthProvider clientId='1071618310134-screnf3mak97nth89b9eo271reg26sgm.apps.googleusercontent.com'>
    <React.StrictMode>
    <App />
    </React.StrictMode>
    </GoogleOAuthProvider>);
