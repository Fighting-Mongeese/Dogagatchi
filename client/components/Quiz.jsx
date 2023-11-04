import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function Quiz(props) {
  const [dogs, setDogs] = useState([]); // 4 urls of dog images loaded from API
  const [solutionUrl, setSolutionUrl] = useState('') // default to zero, get set in set state; maybe math 

  // const [coins, setCoins] = useState(0); // user coins loaded from db

  const getDogs = () => new Promise((resolve, reject) => {
    axios.get('/api/quiz')
      .then((dogArray) => {
        console.log(dogArray.data);
        setDogs(dogArray.data);
        resolve(dogArray.data);
      })
      .catch((err) => {
        console.error('CLIENT ERROR: failed to GET dogs', err);
        reject(err);
      });
  });

  const setSolutionDog = (dogArray) => {
    console.log('inside sSD');
    const randomIndex = Math.floor(Math.random() * dogs.length);
    setSolutionUrl(dogArray[randomIndex]);
  };

  const handleAnswerSubmission = (e) => {
    const { value } = e.target; // unpack event

    if (value === solutionUrl) {
      console.log('Correct! You gained coins!')
    } else {
      console.log('Wrong answer! You gained no points!')
    }
  };

  useEffect(() => {
    getDogs()
      .then((dogArray) => setSolutionDog(dogArray));
  }, []);

  const dogButtons = dogs.map((url, index) => {
    const noDomain = url.slice(url.indexOf('breeds/') + 7);
    let breed = noDomain.slice(0, noDomain.indexOf('/'));
    if (breed.includes('-')) {
      breed = breed.split('-').reverse().join(' ');
    }
    return (
      <Button value={url} style={{ margin: '20px' }} key={index} onClick={handleAnswerSubmission} type="button">{breed}</Button>
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <h1>Oh Gawd, what is that thing?</h1>
      <Image style={{ maxHeight: '500px', maxWidth: '500px' }} src={solutionUrl} rounded />
      <h2>Select the correct dog breed to win coins</h2>
      <div style={{ display: 'flex' }}>
        {dogButtons}
      </div>

    </div>
  );
}

export default Quiz;