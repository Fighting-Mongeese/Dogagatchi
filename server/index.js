const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 4000;
const { User, Dog, Dog } = require('./db/index');
const { ATLAS_URI } = require('./config');

const distPath = path.resolve(__dirname, '..', 'dist');

// MIDDLEWARE - every request runs through this middleware
// (functions that all requests go through)
app.use(express.static(distPath)); // Statically serve up client directory
app.use(express.json());

// ~~~~~~~~~~ add users to db~~~~~~~~~~~~~~~
const testFunc = () => {
  User.create({
    username: 'James',
    password: 'xyz',
    coinCount: 8,
    questionCount: 10,
    dogCount: 2,
    breeds: ['https://images.dog.ceo/breeds/otterhound/n02091635_1580.jpg'],
    achievements: ['Star Pupil'],
  })
    .then((newUser) => {
      console.log('Successful add', newUser);
    })
    .catch((err) => {
      console.error('Failed to add user', err);
    });
};
// testFunc();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// *****************ACHIEVEMENTS************************
// set up a net to catch requests (server side request handling for achievements)
app.get('/achievements', (req, res) => {
  User.find() // empty filter object to TEST IN POSTMAN
    .then((user) => { // now we have a collection to send back
    // success case send the data in the response
      res.status(200).send(user);
    })
    .catch((err) => {
    // handle errors
      console.error('FAILED to find all users', err);
      res.sendStatus(500);
    });
});
// ****************END OF ACHIEVEMENTS********************

// GET dog picture and 4 other random dogs from dogs api
app.get('/getDogs', (req, res) => {
  axios.get('https://dog.ceo/api/breeds/image/random/4')
    .then((response) => {
      res.status(200).send(response.data.message);
    });
});

app.put('/correctAnswerUpdate/:_id', (req, res) => {
  const { _id } = req.params;
  const { url } = req.body.dog;
  console.log('add coins', _id, url);
  User.findByIdAndUpdate(
    { _id },
    { $inc: { questionCount: 1, coinCount: 1, dogCount: 1 }, $push: { breeds: url } },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        res.sendStatus(404);
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      console.error('SERVER ERROR: failed to PUT user after correct answer', err);
      res.sendStatus(500);
    });
});

app.get('/kennel/:userId', (req, res) => {
  const { userId } = req.params;
  Dog.find().where({ owner: userId })
    .then((data) => {
      res.status(200)
        .send(data);
    })
    .catch((err) => {
      console.error('SERVER ERROR: failed to GET dog by userId', err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
