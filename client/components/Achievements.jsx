import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Achieve from './Achieve.jsx'


// CHILD OF USER PARENT OF ACHIEVE

//POSSIBLY ADD ANIMATION ON TRIGGERING ACHIEVEMENT

// Access the user who is currently logged in to get information from the database about them




// then check if user account has achievements. if so render to page

function Achievements(props) { //access props.user to get id for subsequent get requests

  const [activeUser, setActiveUser] = useState({});
  // const [userList, setUserList] = useState([]);
  // const [userObj, setUserObj] = useState({})
  const [achievementsEarned, setAchievementsEarned] = useState([]);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const _id  = JSON.parse(sessionStorage.getItem('user'))
  const user = _id._id
  
  useEffect(() => {
    axios.get(`/achievements`) //slash users slash achievements refactor
    .then((userArray) => {
    const filteredArray = userArray.data.filter((item) => {
      return item._id === user
    })
    setActiveUser(filteredArray[0]);
    setCoinsEarned(filteredArray[0].coinCount)
    console.log('after put', filteredArray[0].achievements)
    setAchievementsEarned(filteredArray[0].achievements)
    const varCheck = filteredArray[0].achievements.findIndex((item) => {
      if (item.name === 'Thrifty')
      return true
    })
    if (filteredArray[0].coinCount > 10 && varCheck === -1) {
      //axios put request with activeUser hook
      axios.put(`/achievements/${filteredArray[0]._id}`, {
        name: 'Thrifty',
        image: "https://www.trueachievements.com/imagestore/0007101900/7101902.jpg"
      })
      .then((userData) => {
        console.log('axios put user', userData)
      })
    } else {
      console.log('Limit reached')
    }
})
}, [])

  console.log('top of achievements user:', user, 'id:', _id)
  // set up function to collect user data of current user
  //put in a useEffect so it can be updated 

  // const getUserData = () => new Promise((resolve, reject) => {
  //   axios.get(`/achievements`) //slash users slash achievements refactor
  //     .then((userArray) => {
  //     const filteredArray = userArray.data.filter((item) => {
  //       return item._id === user
  //     })
  //       setActiveUser(filteredArray[0]);
  //       setcoinsEarned(filteredArray[0].coinCount)
  //      //const acheev =filteredArray[0].achievements
  //       resolve(filteredArray[0]);
  //     })
  //     .catch((err) => {
  //       console.error('CLIENT ERROR: failed to get user', err);
  //       reject(err);
  //     });
  // });
  //  console.log('active user outside', filteredArray, activeUser, activeUser._id, activeUser.achievements, coinsEarned, achievementsEarned)

  //empty it won't keep rendering put coinCount in brackets to keep refreshing it
// useEffect(() => {
//   addAchievementMoneybags();
// }, [achievementsEarned])

  //other achievements: Top Dawg for the Smartest Leaderboard
  //An achievement for Each dog owned
  //An achievement for number of times dog fed or played with
  const addAchievementMoneybags = () => {
  console.log('thrifty', coinsEarned, achievementsEarned)
  //console.log('coinsEarned', coinsEarned)
  // (if (user.coins > 5)) then add achievement to user info through put request also an and statement to prevent same achievement from being earned more than once
  if (coinsEarned > 10 && !achievementsEarned.includes('Thrifty')) {
    //axios put request with activeUser hook
    axios.put(`/achievements/${activeUser._id}`, {
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
  // } else if (coinsEarned > 50 && !achievementsEarned.includes('Super Saver')) {
  //   //axios put request with activeUser hook
  //   axios.put(`/achievements/${activeUser}`, {
  //     name: 'Super Saver',
  //     image: 'https://www.trueachievements.com/imagestore/0006900900/6900915.jpg'
  //   })
  //   .then((user) => {
  //     //use promise to set state of achievements earned
  //     setAchievementsEarned(user.data)
  //     console.log('Post put achievements', achievementsEarned, coinsEarned);
  //   })
  //   //error handling
  //   .catch((err) => {
  //     console.error('CLIENT ACHIEVEMENT ERROR', err)
  //   })
  // } else if (coinsEarned > 100 && !achievementsEarned.includes('Money Bags')) {
  //   //axios put request with activeUser hook
  //   axios.put(`/achievements/${activeUser}`, {
  //     name: 'Money Bags',
  //     image: 'https://www.trueachievements.com/imagestore/0006900800/6900859.jpg'
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



  


 // use effect will run once things loads
  // // anything from your client is going to go through your server. Let the server do the listing
  console.log('state check', activeUser, coinsEarned, achievementsEarned)
  return (
  <div className="achievement-container">
    <div className="user-achievements">
      <p>Current achievements:{coinsEarned}</p>
      <div>
        {/* {achievementsEarned.map((achievement) => (
          <Achieve 
          achieve={achievement.name}
          key={achievement._id}
          img={achievement.image}
          // possibly update with a unique key  instead of achievement
          // view={achievementsEarned}
          />
        ))} */}
        {' '}
      </div>

    </div>
  </div>
  );
}

export default Achievements;
