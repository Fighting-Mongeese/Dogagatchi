import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // imports bootstrap library
import App from './components/App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<GoogleOAuthProvider clientId='1079577730220-4c99sue58kge5ndcmdr7sesj6p5k4evg.apps.googleusercontent.com'>
    <React.StrictMode>
    <App />
    </React.StrictMode>
    </GoogleOAuthProvider>);
