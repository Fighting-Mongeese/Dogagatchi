import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PantryItem from './PantryItem.jsx';

function Pantry(props) {
  const signedInUser= JSON.parse(sessionStorage.getItem('user'))
  const [meals, setMeals] = useState(null)
  const [dogs, setDogs] = useState([])

  const getSignedInUserMeals = (userIdParam) => {
    axios.get(`/user/meals/${userIdParam}`)
    .then(({ data }) => {
      const sortedMeals = data.meals.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      setMeals(sortedMeals)
    })
    .catch((err) => console.error('get signed in user ERROR', err))
  }

  const getSignedInUserDogs = (userIdParam) => {
    axios.get(`/dog/users/${userIdParam}`)
    .then((foundInfo) => setDogs(foundInfo.data.dogsArr))
    .catch((err) => console.error('getSignedInUserDogs client', err))
  }

  useEffect( () => {
    getSignedInUserMeals(signedInUser._id)
    getSignedInUserDogs(signedInUser._id)
   }, [])

  return(
    <div className='pantry'>
      <h2>My Meals</h2>
        <div id="pantry" className='meals-container'>
          {meals ? meals.map((mealObj) => (
            <PantryItem
            meal={mealObj}
            dogsArr={dogs}
            signedInUserId={signedInUser._id}
            getSignedInUserMeals={getSignedInUserMeals}
            key={mealObj._id}
            />
          )) : 'You do not have any meals yet! Check out our restaurant to get something extra yummy for your pup!'}
        </div>
    </div>
  )
}

export default Pantry

/**
 *  {dogs.map(dog  => (
            <option
            key={dog._id}
            >{dog.name}</option>
          ))}
 */