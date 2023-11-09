import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PantryItem from './PantryItem.jsx';

function Pantry(props) {
  //const { userId } = props
  const signedInUser= JSON.parse(sessionStorage.user)
  const [meals, setMeals] = useState(null)
  const [dogs, setDogs] = useState([])

  const getSignedInUserMeals = (userIdParam) => {
    //console.log('userId param', userIdParam)
    axios.get(`/getUserById/${userIdParam}`)
    .then(({ data }) => {
      const sortedMeals = data.meals.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      console.log('user data', sortedMeals)
      setMeals(sortedMeals)
    })
    .catch((err) => console.error('get signed in user ERROR', err))
  }

  const getSignedInUserDogs = (userIdParam) => {
    axios.get(`/kennel/${userIdParam}`)
    .then((foundInfo) => setDogs(foundInfo.data.dogsArr))
    .catch((err) => console.error('getSignedInUserDogs client', err))
  }

  useEffect( () => {
    getSignedInUserMeals(signedInUser._id)
    getSignedInUserDogs(signedInUser._id)
   }, [])

  return(
    <div>
      <h2>My Meals</h2>
      {console.log(meals)}
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