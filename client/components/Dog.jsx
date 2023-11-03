import React, { useState } from 'react';
import axios from 'axios';

function Dog() {
  const [hungry, setHunger] = useState(true);
  const [happy, setHappy] = useState(false);

  const handleClick = (e) => {
    if (e === 'feed') {
      setHunger(false);
      const hungerTimer = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      // put request, add new deadline for feeding the dog 24hrs from click
    } else {
      setHappy(true);
      const walkTimer = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      // put request, add new deadline for feeding the dog 24hrs from click
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
          {hungry ? (
            <button
              type="button"
              onClick={() => handleClick('feed')}
            >
              Feed
            </button>
          ) : (
            'FULL'
          )}
        </div>
        <div>
          {happy ? (
            'HAPPY'
          )
            : (
              <button
                type="button"
                onClick={() => handleClick('walk')}
              >
                Walk
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default Dog;
