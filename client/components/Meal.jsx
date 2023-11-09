import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'

function Meal(props){
  //put request to add meal to user's meal array and subtract coins from user's coinCount
  const { user, meal, setUser } = props
  //const [purchaseStatus, setPurchaseStatus] = useState('true')
  const [purchaseText, setPurchaseText] = useState('')

  const buyMeal = () => {
    const newCoinCount = user.coinCount - meal.cost
    if(newCoinCount < 0){
      //setPurchaseStatus(false)
      setPurchaseText('Sorry! You do not have enough tokens. Head over to Pooch Picker to get more!')
    } else {
      axios.put(`/meals/${props.user._id}`, {
        update: {
          type: 'buyMeal'
        },
        meals: {
          meal: props.meal
        },
        coinCount: {
          newCount: newCoinCount
        }
      })
      .then(({ data }) => {
        //console.log(data)
        setUser(data._id)
        //setPurchaseStatus(true)
        setPurchaseText(`Awesome! You bought your pup some delicious ${meal.name} and now have ${data.coinCount} tokens!`)
      })
      .then(() => setTimeout(() => setPurchaseText(''), 3000))
      .catch((err) => console.log('buyMeal client ERROR:', err))

    }
  }

  return(
      <div className="meal-container">
        <div>{purchaseText}</div>
        <img id="meal-item"className="meal-image"src={`${props.meal.image}`}/>
        <p id="meal-item">{props.meal.name}</p>
        <p id="meal-item">{`${props.meal.cost} tokens`}</p>
        <Button 
        id="meal-item" 
        className="meal-button"
        onClick={() => buyMeal()}
        >buy for my pup!</Button>
      </div>
  )
}

export default Meal