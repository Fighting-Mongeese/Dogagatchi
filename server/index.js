const express = require('express');
const path = require('path');

const app = express();
const port = 4000;
const { User } = require('./db/index');

const distPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(distPath)); // Statically serve up client directory
const testFunc = () => {
  User.create({
    username: 'James',
    coins: 8,
  })
    .then((newUser) => {
      console.log('Successful add', newUser);
    })
    .catch((err) => {
      console.error('Failed to add user', err);
    });
};
//testFunc();
app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
