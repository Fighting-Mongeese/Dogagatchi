// 0. Index is the Entry point
// require mongoose after running npm install mongodb
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { ATLAS_URI } = require('../config');

mongoose
  .connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

// setup schema(s)
const userSchema = new mongoose.Schema({
  username: String,
  password: String, // may be changed with passport implementation
  coinCount: Number, // increments with correct question and decrements to feed play with dog
  questionCount: Number, // increments with correct answer and stays
  dogCount: Number, // increments when dogogachi is creates and decrements if dogogachi is deleted
  breeds: [String], // array of image strings that are correctly answered
  achievements: [String],
});
// creates user docs in the db
const User = mongoose.model('User', userSchema);
// schema for Dogs
const dogSchema = new mongoose.Schema({
  name: String,
  img: String, // breed
  isHungry: Date, // timers
  isHappy: Date, // timers
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = {
  User,
  Dog,
};
