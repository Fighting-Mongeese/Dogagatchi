import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { capitalize, uniq } from 'lodash'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function Quiz(props) {
  const [dogs, setDogs] = useState([]); // 4 urls of dog images loaded from API
  const [solutionUrl, setSolutionUrl] = useState(''); // default to zero, get set in set state; maybe math 
  const [userId, setUserId] = useState('');
  const [alertText, setAlertText] = useState('Start earning coins by correctly selecting the breed pictured!');

  const parseUrl = (url) => {
    const noDomain = url.slice(url.indexOf('breeds/') + 7);
    let breed = capitalize(noDomain.slice(0, noDomain.indexOf('/')));
    if (breed.includes('-')) {
      breed = breed.split('-').map((word)=> capitalize(word)).reverse().join(' ');
    }
    return breed;
  };

  const checkForDuplicateDogs = (urlArray) => {
    let hasDuplicates = false;

    const breedArray = urlArray.map((url) => parseUrl(url));
    const uniqBreedArray = uniq(breedArray);
    
    if (uniqBreedArray.length < 4) {
      hasDuplicates = true;
    }
   
    return hasDuplicates;
  };

  const getDogs = () => new Promise((resolve, reject) => {
    axios.get('/getDogs')
      .then((dogArray) => {
        // console.log(dogArray.data);

        // if there are duplicates
        if (checkForDuplicateDogs(dogArray.data)) {
          // run getDogs again (until no duplicates)
          getDogs();
        }
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

  const getNewRound = () => {
    getDogs()
      .then((dogs) => setSolutionDog(dogs))
  }

  const handleAnswerSubmission = (e) => {
    const { value } = e.target; // unpack event

    // value is a url assigned to the button's value
    if (value === solutionUrl) {
      axios.put(`/correctAnswerUpdate/${userId}`, {
        dog: {
          url: solutionUrl,
        },
      })
        .then((user) => { // put request returns updated user object
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
    } else { // if the answer is wrong
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
    getNewRound();
  }, []);

  const dogButtons = dogs.map((url, index) => {
    const breed = parseUrl(url);
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
      <Image alt="Sorry, someone let the dog out! Click 'Refresh' to fetch a new pup." className='img-trivia' src={solutionUrl} rounded />
      <h2>{alertText}</h2>
      <div style={{ display: 'flex' }}>
        {dogButtons}
        <Button variant='info' onClick={getNewRound}>Refresh Dog</Button>
      </div>
      <div>

      </div>
    </div>
  );
}

export default Quiz;