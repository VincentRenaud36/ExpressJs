const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./sequelize');
require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('passport');


// Import Routes
const helloRoute = require('./src/routes/routes');
const registerRoute = require('./src/routes/routes');
const loginRoute = require('./src/routes/routes');
const profilRoute = require('./src/routes/routes');
const fileRoute = require('./src/routes/routes');
const userRoute = require('./src/routes/routes');

app.use('/', helloRoute);
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', profilRoute);
app.use('/', fileRoute);
app.use('/users', userRoute);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

require('./passport');

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
