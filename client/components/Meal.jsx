import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

function Meal(props){
  //put request to add meal to user's meal array and subtract coins from user's coinCount
  const { user, meal } = props
  const [purchaseStatus, setPurchaseStatus] = useState('')

  const buyMeal = () => {
    const newCoinCount = user.coinCount - meal.cost
    if(newCoinCount <= 0){
      setPurchaseStatus('Sorry! You do not have enough tokens. Head over to Pooch Picker to get more!')
    } else {
      axios.put(`/user/meal/${props.user._id}`, {
        meals: {
          meal: props.meal
        },
        coinCount: {
          newCount: newCoinCount
        }
      })
      .then((updatedUser) => {
        setPurchaseStatus(`Awesome! You bought your pup some delicious ${meal.name} and now have ${updatedUser.coinCount} tokens!`)
      })
      .catch((err) => console.log('buyMeal client ERROR:', err))

    }
  }

  return(
      <div className="meal-container">
        {console.log(props)}
        <img id="meal-item"className="meal-image"src={`${props.meal.image}`}/>
        <p id="meal-item">{props.meal.name}</p>
        <p id="meal-item">{`${props.meal.cost} tokens`}</p>
        <Button id="meal-item" className="meal-button">buy for my pup!</Button>
      </div>
  )
}

export default Meal