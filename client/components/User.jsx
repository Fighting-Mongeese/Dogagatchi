import React, { useState, useEffect } from 'react';
import NavBar from './Navbar.jsx';
import Achievements from './Achievements.jsx';
import Kennel from './Kennel.jsx';

function User(props) {
  const [user, setUser] = useState('');
  useEffect( () => {
    const userObj= JSON.parse(sessionStorage.user)
    setUser(userObj)
  }, [])

return(
<div>


  <div className="user-main-div">
    <div className="user-stats-container">
      <div className="user-stats">
      Stats
      </div>
    </div>
    <Kennel className="user-kennel"/>
    <Achievements user={user} className="user-achievements"/>
  </div>
 </div>
)
}

export default User;