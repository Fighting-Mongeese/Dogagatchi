const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 4000;
const { User, Dog } = require('./db/index');

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

//app.put populate
// watch your slashes. 2nd time getting tripped up by not placing a slash before userId
app.put('/achievements/:userId', (req, res) => {
  //destructure params from req obj
  const { userId } = req.params;
  const newAchieve  = req.body.achievements;
console.log('SERVER PUT',req.body.achievements, newAchieve)
//return the updated user
  User.findByIdAndUpdate(
    userId,
    { $push: { achievements: newAchieve }},
    {new: true},//sends back the updated user with new
  )
  .then((user) => {
    if (user) {
      console.log('Updated user', user)
      res.status(200).send(user);
    } else { //else get back null
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error('SERVER ERROR: failed to PUT user achievements', err);
    res.sendStatus(500);
  })
})
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

// *****************KENNEL************************
app.get('/kennel/:userId', (req, res) => {
  const { userId } = req.params;
  Dog.find().where({ owner: userId })
    .then((dogArr) => {
      res.status(200)
        .send(dogArr);
    })
    .catch((err) => {
      console.error('SERVER ERROR: failed to GET dog by userId', err);
      res.sendStatus(500);
    });
});

app.put('/kennel/:dogId', (req, res) => {
  const { dogId } = req.params;
  const { status } = req.body;

  Dog.findByIdAndUpdate(dogId, status, { returnDocument: 'after' })
    .then((updatedDog) => {
      if(updatedDog){
        res.status(200).send(updatedDog);
      }
      res.sendStatus(404);
    })
    .catch((err) => {
      console.error('SERVER ERROR: failed to UPDATE dog status by id', err);
      res.sendStatus(500);
    });
});

app.delete('/kennel/:dogId', (req, res) => {
  const { dogId } = req.params;

  Dog.findByIdAndDelete(dogId)
    .then((deletedDog) => {
      if(deletedDog){
        res.status(200).send(deletedDog);
      }
      res.sendStatus(404);
    })
    .catch((err) => {
      console.error('SERVER ERROR: failed to DELETE dog by id', err);
      res.sendStatus(500);
    });
})
// ****************END OF KENNEL********************

/// //////////////LEADER BOARD ROUTES///////////////////////////
const filterUsers = (filterProp) => User.find({}, null, { limit: 5 }).sort({ [filterProp]: -1 });

app.get('/leaderboard/:type', (req, res) => {
  const { type } = req.params;
  if (type === 'smartest') {
    filterUsers('questionCount')
      .then((users) => {
        if (users) {
          res.status(200).send(users);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error('get LB/smartest ERROR (server):', err);
        res.sendStatus(500);
      });
  } else if (type === 'richest') {
    filterUsers('coinCount')
      .then((users) => {
        if (users) {
          res.status(200).send(users);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error('get LB/richest ERROR (server):', err);
        res.sendStatus(500);
      });
  }
});
// SERVER CONNECTION

// ****************END OF ACHIEVEMENTS********************

app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
