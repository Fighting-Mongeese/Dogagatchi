const express = require('express');
const path = require('path');

const app = express();
const port = 4000;
const { User } = require('./db/index');

const distPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(distPath)); // Statically serve up client directory

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
// testFunc();

app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
