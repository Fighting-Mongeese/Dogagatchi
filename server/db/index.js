// 0. Index is the Entry point
// require mongoose after running npm install mongodb
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { ATLAS_URI } = require('../config');

mongoose
  .connect(ATLAS_URI)
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
  achievements: [{name: String, image: String, description: String}],
  meals: [{name:String, image:String, idMeal:Number, cost:Number, fullTime:String}],
  img: String
});
// creates user docs in the db
const User = mongoose.model('User', userSchema);
// schema for Dogs
const dogSchema = new mongoose.Schema({
  name: String,
  img: String, // breed
  feedDeadline: Date, // timers
  walkDeadline: Date, // timers
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = {
  User,
  Dog,
};
