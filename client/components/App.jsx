import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx'
import Button from 'react-bootstrap/Button';
import Home from './Home.jsx';
import Quiz from './Quiz.jsx';
import axios from 'axios';
import Achievements from '../components/Achievements.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import {Context} from './Context.jsx'


import '../app.css'; // imports css to apply to all components in App component
import LeaderBoard from './Leaderboard.jsx';
function App() {
  return (
    <Context>
    <Router>
        <Routes>
            <Route element={<ProtectedRoute/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/leaderBoard' element={<LeaderBoard/>}/>
            <Route path='/quiz' element={<Quiz/>}/>
            <Route path='/achievements' element={<Achievements/>}/>
            </Route>
            <Route path='/' element={<Login/>}/>
        </Routes>
    </Router>
    </Context>
  );
}

export default App;