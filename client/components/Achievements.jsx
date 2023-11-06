import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Achieve from './Achieve.jsx'

// CHILD OF APP PARENT OF ACHIEVE

// Goals for achievements:

// Access the user who is currently logged in to get information from the database about them




// then check if user account has achievements. if so render to page

function Achievements() {
  
  const [activeUser, setActiveUser] = useState('');
  const [achievementsEarned, setAchievementsEarned] = useState([]);
  const [userCoins, setUserCoins] = useState(0);

  // set up function to collect user data of current user
  const getUserData = () => new Promise((resolve, reject) => {
    axios.get('/achievements')
      .then((userArray) => {
        //console.log('On load', userArray.data);
        setActiveUser(userArray.data[2]);
        setUserCoins(userArray.data[2].coinCount)
        setAchievementsEarned(userArray.data[2].achievements)
        resolve(userArray.data);
      })
      .then (() => {
        //console.log('active user, coins, achievements', activeUser, userCoins, achievementsEarned)
      })
      .catch((err) => {
        console.error('CLIENT ERROR: failed to get user', err);
        reject(err);
      });
  });
  //console.log('active user outside', activeUser, userCoins, achievementsEarned)
 

  // From the user information, add some logic to determine when an achievement is unlocked
const addAchievementMoneybags = () => {
  //console.log('userCoins', userCoins)
  // (if (user.coins > 5)) then add achievement to user info through put request also an and statement to prevent same achievement from being earned more than once
  if (userCoins > 10 && !achievementsEarned.includes('Thrifty')) {
    //axios put request with activeUser hook
    axios.put(`/achievements/${activeUser}`, {
      name: 'Thrifty',
      image: "https://www.trueachievements.com/imagestore/0007101900/7101902.jpg"
    })
    .then((user) => {
      //use promise to set state of achievements earned
      setAchievementsEarned(user.data)
      console.log('Post put achievements', achievementsEarned);
    })
    //error handling
    .catch((err) => {
      console.error('CLIENT ACHIEVEMENT ERROR', err)
    })
  } 
  // else if (userCoins > 11 && !achievementsEarned.includes('Super Saver')) {
  //   //axios put request with activeUser hook
  //   axios.put(`/achievements/${activeUser}`, {
  //     achievements: 'Super Saver'
  //   })
  //   .then((user) => {
  //     //use promise to set state of achievements earned
  //     setAchievementsEarned(user.data)
  //     console.log('Post put achievements', achievementsEarned);
  //   })
  //   //error handling
  //   .catch((err) => {
  //     console.error('CLIENT ACHIEVEMENT ERROR', err)
  //   })
  // }
}

  const [user, setUser] = useState(null);
  useEffect(() => {
      getUserData();
  }, []);
  
  const [count, setCount] = useState(0);

 // use effect will run once things loads
  // // anything from your client is going to go through your server. Let the server do the listing
  return (
    <div>
      <h3>Current achievements:</h3>
      <div>
        {achievementsEarned.map((achievement) => (
          <Achieve 
          achieve={achievement.name}
          key={achievement._id}
          img={achievement.image}
          // possibly update with a unique key  instead of achievement
          // view={achievementsEarned}
          />
        ))}
        {' '}
      </div>
    </div>
  );
}

export default Achievements;
