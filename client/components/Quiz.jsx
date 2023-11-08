import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { capitalize, uniq } from 'lodash'

import { Row, Col, Container, Alert, Image, Button } from 'react-bootstrap';



function Quiz(props) {
  const [dogs, setDogs] = useState([]); // 4 urls of dog images loaded from API
  const [solutionUrl, setSolutionUrl] = useState(''); // default to zero, get set in set state; maybe math 
  const [alert, setAlert] = useState({ text: 'Start earning coins by correctly selecting the breed pictured!', variant: 'light' });

  const parseUrl = (url) => {
    const noDomain = url.slice(url.indexOf('breeds/') + 7);
    let breed = capitalize(noDomain.slice(0, noDomain.indexOf('/')));
    if (breed.includes('-')) {
      breed = breed.split('-').map((word) => capitalize(word)).reverse().join(' ');
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
    axios.get('/api/quiz')
      .then((dogArray) => {
        // if there are duplicates
        console.log('arr', dogArray)
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
    const { _id, } = JSON.parse(sessionStorage.getItem('user')) // unpack session user

    const { value } = e.target; // unpack event
    // value is a url assigned to the button's value
    if (value === solutionUrl) {
      axios.put(`/user/${_id}`, {
        dog: {
          url: solutionUrl,
        },
      })
        .then((user) => { // put request returns updated user object
          setAlert({ text: `Correct! Keep up the good work! You now have ${user.data.coinCount} coins`, variant: 'success' });
          getDogs()
            .then((dogArray) => {
              setSolutionDog(dogArray);
            });
        })
        .catch((err) => {
          console.error('CLIENT ERROR: failed to start new round after correct answer', err);
        });
    } else { // if the answer is wrong
      setAlert({ text: 'Nice try! Have another go!', variant: 'danger' });
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
      <Button style={{ width: '250px', margin: '5px' }} value={url} key={index} onClick={handleAnswerSubmission} type="button">{breed}</Button>
    );
  });

  /*
  
  */


  return (
    <Container >
      <Row>
        <Col style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h1 style={{ fontSize: '80px', color: 'black' }}>Pooch Picker</h1>
          <div style={{ height: '480px', width: '480px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ margin: 'auto', }} alt="Sorry, someone let the dog out! Click 'Refresh Dog' to fetch a new pup." className='img-trivia' src={solutionUrl} rounded />
          </div>
          <Alert style={{ fontSize: '24px', margin: '20px', }} variant={alert.variant}>{alert.text}</Alert>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
            {dogButtons}
            <Button variant='danger' style={{ width: '250px' }} onClick={getNewRound}>Refresh Dog</Button>
          </div>
          <div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Quiz;