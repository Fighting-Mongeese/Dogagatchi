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
    axios.get(`/user/${user}`) //slash users slash achievements refactor
    .then((userArray) => {
      console.log('ha!',  userArray.data)
    // const userArray = userArray.data.filter((item) => {
    //   return item._id === user
    // })
    setActiveUser(userArray[0]);
    setCoinsEarned(userArray.data[0].coinCount)
    //console.log('first put', userArray[0].achievements, 'user', userArray)
    const thriftyCheck =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Thrifty') {
      return true
      }
    })
    const superSaverCheck =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Super Saver') {
      return true
      }
    })
    const moneyBagsCheck =  userArray.data[0].achievements.findIndex((item) => {
      if (item.name === 'Money Bags') {
      return true
      }
    })
    //Object.values(userArray[0].achievements).includes('Thrifty')
    //console.log('thriftyCheck', thriftyCheck, userArray[0])
    if (userArray.data[0].coinCount > 10 && thriftyCheck === -1) {
      //axios put request with activeUser hook
      axios.put(`/user/achievements/${userArray[0]._id}`, {
        name: 'Thrifty',
        image: "https://www.trueachievements.com/imagestore/0007101900/7101902.jpg"
      })
      .then(() => console.log('bbbb'))
    }
    if (userArray.data[0].coinCount > 30 && superSaverCheck === -1) {
          //axios put request with activeUser hook
          axios.put(`/achievements/${userArray[0]._id}`, {
            name: 'Super Saver',
            image: 'https://www.trueachievements.com/imagestore/0006900900/6900915.jpg'
          })
        }
        //console.log('moneybags check', userArray[0].coinCount, moneyBagsCheck )
    if (userArray.data[0].coinCount > 35 && moneyBagsCheck === -1) {
      //axios put request with activeUser hook
      axios.put(`/achievements/${userArray.data[0]._id}`, {
        name: 'Money Bags',
        image: 'https://www.trueachievements.com/imagestore/0006900800/6900859.jpg'
      })
    }
    axios.get(`/user/${userArray.data[0]._id}`) //slash users slash achievements refactor
    .then((newUser) => {
      console.log('diss', newUser)
    // const newFilter = userArray.data.filter((item) => {
    //   return item._id === user
    // })
    //console.log('2nd get', newFilter[0].achievements)
    setAchievementsEarned(newUser.data[0].achievements)
  })
  .catch((err) => console.log('log', err))

})
}, [])

  //console.log('top of achievements user:', user, 'id:', _id)
  //console.log('state check', activeUser, coinsEarned, achievementsEarned)
  return (
  <div className="achievement-container">
    <div className="user-achievements">
      <p className="achievement-header">ACHIEVEMENTS EARNED</p>
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
      </div>

    </div>
  </div>
  );
}

export default Achievements;
