import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
function Meal(props){
  const getCost = () => {
    return Math.floor(Math.random() * 20)
  }
  return(
    <div>
      <img src={`${props.meal.strMealThumb}`}/>
      <h3>{ `${props.meal.strMeal} for ${getCost()} tokens` }</h3>
      <Button>buy for my pup!</Button>
    </div>
  )
}

export default Meal