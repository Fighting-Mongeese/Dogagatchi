const express = require('express');
const path = require('path');
const passport = require('passport')
const LocalStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
require('dotenv').config()

const app = express();
const port = 4000;

const distPath = path.resolve(__dirname, '..', 'dist');

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET

app.use(express.static(distPath)); 
app.use(session{secret: 'secret', resave: true, saveUninitialized: true})
app.use(passport.initialize())
app.use(passport.session())

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
  done(niull, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({_id: id})
  .then((user) => {
    done(null, user)
  })
})

app.post('auth/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
}))

app.get('/success', (req, res) => {
  res.send({success: true})
})

app.get('/failure', (req, res) => {
  res.send({success: false})
})


app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});