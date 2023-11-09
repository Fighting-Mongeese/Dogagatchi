import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Modal, Card, Image } from 'react-bootstrap'

function Meal(props) {
  //put request to add meal to user's meal array and subtract coins from user's coinCount
  const { user, meal, setUser } = props
  //const [purchaseStatus, setPurchaseStatus] = useState('true')
  const [purchaseText, setPurchaseText] = useState('')

  const buyMeal = () => {
    const newCoinCount = user.coinCount - meal.cost
    if (newCoinCount < 0) {
      //setPurchaseStatus(false)
      setPurchaseText('Sorry! You do not have enough tokens. Head over to Pooch Picker to get more!')
    } else {
      axios.put(`/user/meals/${props.user._id}`, {
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
          setUser(data._id)
          //setPurchaseStatus(true)
          setPurchaseText(`Awesome! You bought your pup some delicious ${meal.name} and now have ${data.coinCount} tokens!`)
        })
        .then(() => setTimeout(() => setPurchaseText(''), 3000))
        .catch((err) => console.log('buyMeal client ERROR:', err))

    }
  }

  return (
    <Card className="meal-container my-2 p-2">
      <div className='d-flex flex-row w-75'>
        <Image id="meal-item" className="meal-image p-2" src={`${props.meal.image}`} roundedCircle />
        <Card.Body className='d-flex flex-column'>
          <Card.Title id="meal-item">{props.meal.name}</Card.Title>
          <Card.Text id="meal-item">{`${props.meal.cost} tokens`}</Card.Text>
          <Card.Text id="meal-item">{purchaseText}</Card.Text>
        </Card.Body>
      </div>
      <div className='d-flex align-items-center justify-content-middle mx-4'>
        <Button
          variant="primary"
          onClick={() => buyMeal()}
        >Add to Pantry!</Button>
      </div>
    </Card>
  )
}

export default Meal