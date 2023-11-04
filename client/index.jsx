import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // imports bootstrap library
import App from './components/App.jsx';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App />);
