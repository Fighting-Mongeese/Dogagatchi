import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Goals for achievements:

// Access the user who is currently logged in to get information from the database about them

// From the user information, add some logic to determine when an achievement is unlocked
// (if (user.coins > 5)) then add achievement to user info through put request

// then check if user account has achievements. if so render to page

function Achievements() {
  const [activeUser, setActiveUser] = useState('');
  const [achievementsEarned, setAchievementsEarned] = useState('');
  const [userCoins, setUserCoins] = useState(0);

  // set up function to collect user data of current user
  const getUserData = () => new Promise((resolve, reject) => {
    axios.get('/achievements')
      .then((userArray) => {
        console.log('On load', userArray.data);
        setActiveUser(userArray.data[0]._id);
        setUserCoins(userArray.data[0].coinCount)
        setAchievementsEarned(userArray.data[0].achievements)
        resolve(userArray.data);
      })
      .then (() => {
        console.log('active user', activeUser, userCoins)
      })
      .catch((err) => {
        console.error('CLIENT ERROR: failed to get user', err);
        reject(err);
      });
  });
  //console.log('active user outside', activeUser, userCoins, achievementsEarned)
  //set up function to change achievements on user data

const addAchievementMoneybags = () => {
  //console.log('userCoins', userCoins)
  if (userCoins > 5 && !achievementsEarned.includes('Moneybags')) {
    axios.put(`/achievements/${activeUser}`, {
      achievements: 'Moneybags'
    })
    .then((user) => {
      setAchievementsEarned(user.data)
     
      console.log('Post put achievements', achievementsEarned);
    })

    .catch((err) => {
      console.error('CLIENT ACHIEVEMENT ERROR', err)
    })
  }
}

  const [user, setUser] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setUserCoins(status.user);
      console.log('test');
    }
  });
  // getUserData();
  // const determineCoins = (userArray) => {
  //    setUserCoins(userArray);
  // };
  // console.log('usercoins', determineCoins());

  const [count, setCount] = useState(0);

  useEffect(() => {
    `You clicked ${count} times`;
  }); // use effect will run once things loads
  // // anything from your client is going to go through your server. Let the server do the listing
  return (
    <div>
      <h3>Achievement Test Rendering</h3>
      <p>
        Welcome
        {' '}
        {activeUser}
        {' '}
      </p>
      <button type="button" className="btn btn-outline-success" onClick={() => setCount(count + 1)}>Click me for achievements</button>
      <button type="button" className="btn btn-outline-success" onClick={() => getUserData()}>Get user</button>
      <button type="button" className="btn btn-outline-success" onClick={() => addAchievementMoneybags()}>Check if achievement earned</button>
    </div>
  );
}

export default Achievements;
