import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

function Pantry(props) {
  //const { userId } = props
  const signedInUser= JSON.parse(sessionStorage.user)
  const [meals, setMeals] = useState([])

  const getSignedInUserMeals = (userIdParam) => {
    //console.log('userId param', userIdParam)
    axios.get(`/getUserById/${userIdParam}`)
    .then(({ data }) => {
      //console.log('user data', data)
      setMeals(data.meals)
    })
    .catch((err) => console.error('get signed in user ERROR', err))
  }

  useEffect( () => {
    getSignedInUserMeals(signedInUser._id)
   }, [])

  return(
    <div>
      Pantry
      {/**map through meals and return new component Pantry Item */}
    </div>
  )
}

export default Pantry