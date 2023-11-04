import React, { useState, useSound } from 'react';
import axios from 'axios';
import barkSound from '../../server/barking-123909.mp3';

const bark = new Audio(barkSound);

function Dog() {
  const [hungry, setHunger] = useState(true);
  const [happy, setHappy] = useState(false);

  const handleClick = (e) => {
    if (e === 'feed') {
      setHunger(false);
      const hungerTimer = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      // put request, add new deadline for feeding the dog 24hrs from click
    } else if (e === 'walk') {
      setHappy(true);
      const walkTimer = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      // put request, add new deadline for feeding the dog 24hrs from click
    } else {
      bark.play();
    }
  };

  return (
    <div className="dog">
      <img
        src="https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190801_112134.jpg"
        alt="Sorry, your dog is in another kennel."
        style={{ width: 200 }}
      />
      <div className="dog-status">
        <div>
          HUNGER:
          {hungry ? (
            <button
              type="button"
              onClick={() => handleClick('feed')}
            >
              🍖
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleClick('bark')}
            >
              🐶
            </button>
          )}
        </div>
        <div>
          HAPPY:
          {happy ? (
            <button
              type="button"
              onClick={() => handleClick('bark')}
            >
              🐾
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleClick('walk')}
            >
              🐕‍🦺
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dog;
