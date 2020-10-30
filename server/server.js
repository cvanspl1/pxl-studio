const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const PORT = 3000;

const app = express();

const mongoURI = 'mongodb://localhost/pxl-database';
mongoose.connect(mongoURI);

app.use(express.static('../client'));

/**
 * Set our Express view engine as ejs.
 * This means whenever we call res.render, ejs will be used to compile the template.
 * ejs templates are located in the client/ directory
 */
app.set('view engine', 'ejs');
app.use(cookieParser());
/**
 * Automatically parse urlencoded body content from incoming requests and place it
 * in req.body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', cookieController.setCookie, (req, res) => {
  /**
   * Since we set `ejs` to be the view engine above, `res.render` will parse the
   * template page we pass it (in this case 'client/secret.ejs') as ejs and produce
   * a string of proper HTML which will be sent to the client!
   */
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

/**
 * signup
 */
app.post(
  '/api/signup',
  userController.createUser,
  //  cookieController.setSSIDCookie,
  //  sessionController.startSession,
  (req, res) => {
    res.status(200).send();
  }
);

/**
 * login
 */
app.post(
  '/api/login',
  userController.verifyUser,
  //  cookieController.setSSIDCookie,
  //  sessionController.startSession,
  (req, res) => {
    // what should happen here on successful log in?
    res.status(200).send();
  }
);

/**
 * Authorized routes
 */
// app.get('/secret', userController.getAllUsers, sessionController.isLoggedIn, (req, res) => {
//  /**
//   * The previous middleware has populated `res.locals` with users
//   * which we will pass this in to the res.render so it can generate
//   * the proper html from the `secret.ejs` template
//   */
//  res.render('./../client/secret', { users: res.locals.users });
// });

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
