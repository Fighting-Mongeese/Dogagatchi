import React from 'react';
//import axios from 'axios';
import Button from 'react-bootstrap/Button';
function Meal(props){
  
  return(
      <div className="meal-container">
        <img id="meal-item"className="meal-image"src={`${props.meal.image}`}/>
        <p id="meal-item">{props.meal.name}</p>
        <p id="meal-item">{props.meal.cost}</p>
        <Button id="meal-item" className="meal-button">buy for my pup!</Button>
      </div>
  )
}

export default Meal