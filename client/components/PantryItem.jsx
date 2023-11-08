import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

function PantryItem(props){
  const { meal, dogsArr } = props

  const feedDog = (dogToFeedObj) => {
    //console.log('dog', dogToFeedObj);

    const status = {
      feedDeadline: new Date(new Date(dogToFeedObj.walkDeadline).getTime() + 24 * 60 * 60 * 1000),
      walkDeadline: new Date(new Date(dogToFeedObj.walkDeadline).getTime() + 12 * 60 * 60 * 1000)
    }

    axios.put(`/kennel/${dogToFeedObj._id}`, { status })
    .then((updatedDog) => console.log(updatedDog))
    .catch((err) => console.error('feed dog meal ERROR:', err));

  }

return(
  <div className="meal-container">
    <img id="meal-item"className="meal-image"src={`${meal.image}`}/>
    <p id="meal-item">{meal.name}</p>

    <DropdownButton id="meal-item" title='Feed a Pup!'>
      {dogsArr.map(dog  => (
        <Dropdown.Item 
          key={dog._id}
          onClick={() => {
            feedDog(dog)
          }}
          >
            {dog.name}
        </Dropdown.Item>))}
    </DropdownButton>
  </div>
)
}

export default PantryItem;
