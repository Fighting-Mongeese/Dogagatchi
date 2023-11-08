import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Meals from '../../server/Categories.js'
import Meal from './Meal.jsx';

function Restaurant(){
  //const [meals, setMeals] = useState([])
  const [user, setUser] = useState({});
  const signedInUser= JSON.parse(sessionStorage.user)

  const getSignedInUserData = (userId) => {
    axios.get(`/user/${userId}`)
    .then(({ data }) => {
      setUser(data[0])})
    .catch((err) => console.error('get signed in user ERROR', err))
  }
  useEffect( () => {
   getSignedInUserData(signedInUser._id)
    //use storage to get user from db the set user state as db user obj
  }, [])

  return(
    <div>
      <h2>Bow Wow's Chow</h2>
      <div className="meals-container">
        {Meals.map((mealObj) => (
          <Meal 
          key={mealObj.idMeal}
          meal={mealObj}
          user={user}
          setUser={getSignedInUserData}
          />
        ))}
      </div>
    </div>
  )
}
export default Restaurant

