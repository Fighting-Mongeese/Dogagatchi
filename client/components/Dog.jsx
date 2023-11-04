import React, { useState, useSound } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
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
          <div className="hunger-bar" style={{ width: '25%' }}>
            <ProgressBar
              striped
              variant="success"
              now={40}
              label="HUNGER"
            />
          </div>
          {hungry ? (
            <Button
              variant="info"
              onClick={() => handleClick('feed')}
            >
              🍖
            </Button>
          ) : (
            <Button
              variant="info"
              onClick={() => handleClick('bark')}
            >
              🐶
            </Button>
          )}
        </div>
        <div>
          <div className="happy-bar" style={{ width: '25%' }}>
            <ProgressBar
              striped
              variant="success"
              now={40}
              label="HAPPINESS"
            />
          </div>
          {happy ? (
            <Button
              variant="info"
              onClick={() => handleClick('bark')}
            >
              🐾
            </Button>
          ) : (
            <Button
              variant="info"
              onClick={() => handleClick('walk')}
            >
              🐕‍🦺
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dog;
