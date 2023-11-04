import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx'
import Button from 'react-bootstrap/Button';
import Home from './Home.jsx'
import Quiz from './Quiz.jsx';


import '../app.css'; // imports css to apply to all components in App component

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/quiz' element={<Quiz/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    </Router>
  );
}

export default App;
