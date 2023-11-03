const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

const distPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(distPath)); // Statically serve up client directory

app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});