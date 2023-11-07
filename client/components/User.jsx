import React, { useState, useEffect } from 'react';
import NavBar from './Navbar.jsx';
import Achievements from './Achievements.jsx';
import Kennel from './Kennel.jsx';

function User(props) {
  const [user, setUser] = useState('');
  useEffect( () => {

  })
return(
<div>
    <NavBar />
    
  <div className="user-main-div">
    <div className="user-stats">
      Stats
    </div>
    <Kennel className="user-kennel"/>
    <Achievements className="user-achievements"/>
   
  </div>
 </div>
)
}

export default User;