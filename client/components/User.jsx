import React, { useState, useEffect } from 'react';
import NavBar from './Navbar.jsx';
import Achievements from './Achievements.jsx';
import Kennel from './Kennel.jsx';
import axios from 'axios'

function User(props) {
  const [user, setUser] = useState('');
  useEffect( () => {
    const userObj = JSON.parse(sessionStorage.user)
    setUser(userObj)
    axios.get('/leaderboard/smartest')
      .then(({ data }) => {
        const index = data.findIndex(userData => userData._id === user._id)
        console.log("jjj", data, user, index); // sets leaders to data property from User query obj
      })
      .catch((err) => console.error('getLeaders ERROR (client):', err));
  }, [])

return(
<div>


  <div className="user-main-div">
    <div className="user-stats-container">
      <div className="user-stats">
      
      </div>
    </div>
    <Kennel className="user-kennel"/>
    <Achievements user={user} className="user-achievements"/>
  </div>
 </div>
)
}

export default User;