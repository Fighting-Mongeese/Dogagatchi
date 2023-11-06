import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Quiz from './Quiz.jsx';
import axios from 'axios';
import Achievements from '../components/Achievements.jsx';
import Kennel from './Kennel.jsx'
import Search from './Search.jsx';
import User from './User.jsx';
import '../app.css'; // imports css to apply to all components in App component
import LeaderBoard from './Leaderboard.jsx';

function App() {
  const [searchedUserData, setSearchedUserData] = useState({})
  return (
    <div>
      <div>APP RENDERING</div>
      <Button>Bootstrap Buttons</Button>
      <Quiz />

      <Search
      setSearchedUserData={setSearchedUserData}
      />
      <User
      user={searchedUserData}
      />
      <Achievements />

      <LeaderBoard
      setSearchedUserData={setSearchedUserData}
      />

      <Kennel />
    </div>
  );
}

export default App;