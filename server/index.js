const express = require('express');
const path = require('path');
const axios = require('axios');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
require('dotenv').config()

const app = express();
const port = 4000;
const { User } = require('./db/index');

const distPath = path.resolve(__dirname, '..', 'dist');


app.use(express.static(distPath)); 
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username, password: password})
  .then((user) => {
    if(user){
      return done(null, user)
    }
    return done(null, false, {message: "incorrect username/password"})
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({_id: id})
  .then((user) => {
    done(null, user)
  })
})

app.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
}))

app.get('/success', (req, res) => {
  res.send({success: true})
})

app.get('/failure', (req, res) => {
  res.send({success: false})
})



// add users to db
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
testFunc();

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

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'), function(err) {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
