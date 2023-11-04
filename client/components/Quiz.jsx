import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function Quiz(props) {
  const [dogs, setDogs] = useState([]); // 4 urls of dog images loaded from API
  const [solutionUrl, setSolutionUrl] = useState(''); // default to zero, get set in set state; maybe math 
  const [userId, setUserId] = useState('');
  // const [userCoins, setCoins] = useState(0); // user coins loaded from db
  const [alertText, setAlertText] = useState('Start earning coins by correctly selecting the breed pictured!');


  const getDogs = () => new Promise((resolve, reject) => {
    axios.get('/getDogs')
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
    const randomIndex = Math.floor(Math.random() * dogs.length);
    setSolutionUrl(dogArray[randomIndex]);
  };

  const handleAnswerSubmission = (e) => {
    const { value } = e.target; // unpack event

    // value is a url assigned to the button's value
    if (value === solutionUrl) {
      axios.put(`/correctAnswerUpdate/${userId}`, {
        dog: {
          url: solutionUrl,
        },
      })
        .then((user) => {
          console.log(user);
          setAlertText(`Correct! Keep up the good work! You now have ${user.data.coinCount} coins`);
          getDogs()
            .then((dogArray) => {
              setSolutionDog(dogArray);
            });
        })
        .catch((err) => {
          console.error('CLIENT ERROR: failed to start new round after correct answer', err);
        });
    } else {
      setAlertText('Nice try! Have another go!');
      getDogs()
        .then((dogArray) => {
          setSolutionDog(dogArray);
        })
        .catch((err) => {
          console.error('CLIENT ERROR: failed to start new round after correct answer', err);
        });
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <h3>Add your user ID in the input below</h3>
      <p>654660d5a2683bbdcb573a83, 6546609aa2683bbdcb573a82, 65466062a2683bbdcb573a81</p>
      <input type="text" onChange={(e) => setUserId(e.target.value)} value={userId} />
      <h3>Oh Gawd, what is that thing?</h3>
      <Image style={{ maxHeight: '500px', maxWidth: '500px' }} src={solutionUrl} rounded />
      <h2>{alertText}</h2>
      <div style={{ display: 'flex' }}>
        {dogButtons}
      </div>
      <div>

      </div>
    </div>
  );
}

export default Quiz;