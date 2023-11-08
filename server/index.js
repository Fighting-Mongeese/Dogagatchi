const express = require('express');
const path = require('path');
const axios = require('axios');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
require('dotenv').config()

const app = express();
const port = 4000;
const { User, Dog } = require('./db/index');

const { ATLAS_URI } = require('./config');


const distPath = path.resolve(__dirname, '..', 'dist');


// MIDDLEWARE - every request runs through this middleware
// (functions that all requests go through)
app.use(express.static(distPath)); // Statically serve up client directory
app.use(express.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "Incorrect username/password" })
      }

      bcrypt.compare(password, user.password)
        .then((cryptPassword) => {
          console.log('crypt', cryptPassword)

          if (!cryptPassword) {
            return done(null, false, { message: "Incorrect username/password" })
          }
          return done(null, user)
        })
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById({ _id: id })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

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

app.post('/auth/login', passport.authenticate('local', { failureRedirect: '/fail', failureFlash: true }), (req, res) => {
  const user = req.user
  res.json({ message: "success", user })
})

app.post('/auth/register', (req, res) => {
  const { username, password } = req.body


  if (!username || !password) {
    console.log('none')
    return res.status(400).json({ message: "Must enter a usernme and password" })
  }



  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        console.log('user', user)
        return res.status(400).json({ message: "User already exists" })
      }
      bcrypt.hash(password, 10)
        .then((pass) => {
          User.create({ username: username, password: pass })
            .then((user) => {
              console.log('final', user)
              return res.status(201).json({ message: 'success', user })
            })
        })
    })
})

app.get('/fail', (req, res) => {
  res.json({ message: req.flash('error')[0] })
})

  //get request to /meals/:id should get one user and send back all user data to client

  app.get('/getUserById/:userId', (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
    .then((foundUser) => res.status(200).send(foundUser))
    .catch((err) => {
      console.error('get User by id server ERROR', err);
    })
  })
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
  const newAchieve = req.body.achievements;
  console.log('SERVER PUT', req.body.achievements, newAchieve)
  //return the updated user
  User.findByIdAndUpdate(
    userId,
    { $push: { achievements: newAchieve } },
    { new: true },//sends back the updated user with new
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


// **************** START OF QUIZ ********************

// GET dog picture and 4 other random dogs from dogs api
app.get('/quiz/getDogs', (req, res) => {
  axios.get('https://dog.ceo/api/breeds/image/random/4')
    .then((response) => {
      res.status(200).send(response.data.message);
    });
});

app.put('/quiz/updateUser/:_id', (req, res) => {
  const { _id } = req.params;
  const { url } = req.body.dog;
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


// **************** END OF QUIZ ********************

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

app.post('/kennel', (req, res) => {
  const { name, img, owner } = req.body;
  const status = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  Dog.create({
    name,
    img,
    owner,
    feedDeadline: status,
    walkDeadline: status
  })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('SERVER ERROR: failed to CREATE dog', err);
      res.sendStatus(500);
    });
})

app.put('/kennel/:dogId', (req, res) => {
  const { dogId } = req.params;
  const { status } = req.body;

  Dog.findByIdAndUpdate(dogId, status, { returnDocument: 'after' })
    .then((updatedDog) => {
      if (updatedDog) {
        res.status(200).send(updatedDog);
      } else {
        res.sendStatus(404);
      }
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
      if (deletedDog) {
        return res.status(200).send(deletedDog);
      } else {
        res.sendStatus(404);
      }
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

//put request to add meal to user's meal array and subtract coins from user's coinCount
app.put('/meals/:userId', (req, res) =>{
  const { coinCount, meals } = req.body
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, {
    $set: {coinCount: coinCount.newCount},
    $push: {meals: meals.meal}
  }, {returnDocument: 'after'} )
  .then((updatedUser) => {
    updatedUser ? res.status(200).send(updatedUser) : res.sendStatus(404)
  })
  .catch((err) => console.error('meals put req server ERROR:', err))
  })




//GET request to '/search/:username' should query the database for the user and send back user data
app.get('/searchUser/:username', (req, res) => {
  const { username } = req.params
  User.findOne({ username })
    .then((user) => {
      user ? res.status(200).send(user) : res.sendStatus(404);
    })
    .catch((err) => {
      console.error('search user (server) error:', err)
      res.sendStatus(500);
    })
})


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

// SERVER CONNECTION
app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
