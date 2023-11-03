// 0. Index is the Entry point
// require mongoose after running npm install mongodb
const { ATLAS_PASSWORD } = process.env;
const mongoose = require('mongoose');

const mongoUri = `mongodb+srv://dogagotchi:${ATLAS_PASSWORD}@dogtrivia.gxhy4jj.mongodb.net/?retryWrites=true&w=majority`;

const db = mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connection to DB successful');
  })
  .catch((err) => {
    console.error('Connection to DB failed', err);
  });
