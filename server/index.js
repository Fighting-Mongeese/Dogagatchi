const express = require('express');
const path = require('path');
const axios = require('axios');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const dogRoutes = require('./routes/dogRoutes')

const app = express();
const routeHandler = express.Router()
const port = 4000;
const { User, Dog } = require('./db/index');

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET


const distPath = path.resolve(__dirname, '..', 'dist');


// MIDDLEWARE - every request runs through this middleware
// (functions that all requests go through)
app.use(express.static(distPath)); 
app.use(express.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

routeHandler.use('/user', userRoutes)
routeHandler.use('/dog', dogRoutes)
app.use('/', routeHandler)

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

          if (!cryptPassword) {
            return done(null, false, { message: "Incorrect username/password" })
          }
          return done(null, user)
        })
    })
}))

passport.use(new GoogleStrategy({
  clientID: clientId, 
  clientSecret: clientSecret, 
  callbackURL: 'http://ec2-13-58-125-52.us-east-2.compute.amazonaws.com/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
return done(null, profile)
}
))

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

// **************** AUTH ROUTES ********************


app.post('/auth/login', passport.authenticate('local', { failureRedirect: '/fail', failureFlash: true }), (req, res) => {
  const user = req.user
  res.json({ message: "success", user })
})

app.post('/auth/register', (req, res) => {
  const { username, password, img } = req.body


  if (!username || !password) {
    return res.status(400).json({ message: "Must enter a usernme and password" })
  }

  User.findOne({ username })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" })
      }
      bcrypt.hash(password, 10)
        .then((password) => {
          User.create({ username, password, coinCount: 14, questionCount: 0, img })
            .then((user) => {
              return res.status(201).json({ message: 'success', user })
            })
        })
    })
})

app.get('auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))

app.get('/fail', (req, res) => {
  res.json({ message: req.flash('error')[0] })
})

app.get('auth/google/callback', passport.authenticate('google', {failureRedirect: '/fail'}), (req, res) => {
  res.redirect('/home')
})

// **************** API ROUTE ********************

// GET dog picture and 4 other random dogs from dogs api
app.get('/api/quiz', (req, res) => {
  axios.get('https://dog.ceo/api/breeds/image/random/4')
    .then((response) => {
      res.status(200).send(response.data.message);
    })
    .catch((err) => { console.error(err) })
});



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

// SERVER CONNECTION
app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
