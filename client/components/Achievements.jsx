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
        console.log('achievements', userArray.data[0]);
        setActiveUser(userArray.data[0].username);
        setUserCoins(userArray.data[0].coinCount);
        console.log('active user', activeUser, userCoins);
        resolve(userArray.data);
      })
      .catch((err) => {
        console.error('CLIENT ERROR: failed to get user', err);
        reject(err);
      });
  });
  console.log('active user outside', activeUser, userCoins);
  // set up function to change achievements on user data

  const addAchievement = () => {
    if (userCoins > 5) {
      axios.put('/achievements', {
        achievements: 'Moneybags',
      })
        .then((user) => {
          setAchievementsEarned(user);
          console.log(user);
        })
        .catch((err) => {
          console.error('CLIENT ACHIEVEMENT ERROR', err);
        });
    }
  };

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
        You clicked
        {' '}
        {count}
        {' '}
        times
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>Click me for achievements</button>
      <button type="button" onClick={() => getUserData()}>Get user</button>
      <button type="button" onClick={() => addAchievement()}>Check if achievement earned</button>
    </div>
  );
}

export default Achievements;
