import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Dog from './Dog.jsx';

function Kennel() {
  const [dogs, setDogs] = useState([]);
  const [userId, setUserId] = useState('');

  const fillKennel = () => new Promise((resolve, reject) => {
    axios.get(`/kennel/${userId}`)
      .then(({ data }) => {
        setDogs(data);
        resolve(data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
      />
      <div>
        <Button onClick={() => fillKennel()}>
          fill kennel
        </Button>
      </div>
      {
        dogs.map((dog) => (
          <Dog dog={dog} key={dog._id} />
        ))
      }
    </div>
  );
}

export default Kennel;
