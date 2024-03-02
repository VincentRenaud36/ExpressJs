const express = require('express');
const app = express();
const port = 3000;

const sequelize = require('./sequelize');

// Import Routes
const helloRoute = require('./src/routes/routes');
const registerRoute = require('./src/routes/routes');


app.use(express.json());

app.use('/', helloRoute);
app.use('/', registerRoute);

(async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
})();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  