import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Meals from '../../server/Categories.js'
import Meal from './Meal.jsx';

function Restaurant(){
  //const [meals, setMeals] = useState([])
  const [user, setUser] = useState('');
  useEffect( () => {
    const userObj= JSON.parse(sessionStorage.user)
    setUser(userObj)
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
          setUser={setUser}
          />
        ))}
      </div>
    </div>
  )
}
export default Restaurant

/**
 * <div>
        {Categories.map((category) => (
          <Button
          key={buttonKey++}
          onClick={() => {getMeals(category.strCategory)}}
          >{category.strCategory}</Button>
        ))}
      </div>

       function getMeals(category){
    return axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((mealsArr) => {
      console.log('success', mealsArr.data.meals)
      // console.log('param', category)
      setMeals(mealsArr.data.meals)
    })
    .catch((err) => {
      console.log('get meals error (client)', err);
    })
  }
 */