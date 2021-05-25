const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = {};
const saltRounds = 10;

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      // if a database error occurs, call next with the error message passed in
      // for the express global error handler to catch
      return next({
        log: `userController.getAllUsers: ERROR: ${JSON.stringify(err)}`,
        message: { err: 'userController.getAllUsers: ERROR: Check server logs for details' },
      });
    }
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    console.log(req.body);
    const errMsg = 'Fill in all inputs';
    return res.render('./../client/signup', { error: errMsg });
  }
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      // if an encrytion error occurs, call next with the error message passed in
      // for the express global error handler to catch
      return next({
        log: `userController.createUser: ERROR: ${JSON.stringify(err)}`,
        message: {
          err: 'userController.createUserEncryption: ERROR: Check server logs for details',
        },
      });
    }
    const newUser = {
      username,
      password: hash,
    };
    User.create(newUser, (err, user) => {
      if (err) {
        // if a database error occurs, call next with the error message passed in
        // for the express global error handler to catch
        return next({
          log: `userController.createUser: ERROR: ${JSON.stringify(err)}`,
          message: { err: 'userController.createUser: ERROR: Check server logs for details' },
        });
      }
      // store retrieved users into res.locals and move on to next middleware
      if (!res.locals.users) res.locals.users = [];
      res.locals.users.push(user);

      return next();
    });
  });
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  const USERNAME = req.body.username;
  const PASSWORD = req.body.password;
  User.find({ username: USERNAME }, (err, user) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err || user.length === 0) {
      return next({
        log: `userController.verifyUser: ERROR: ${JSON.stringify(err)}`,
        message: { err: 'ERROR: Username does not exist' },
      });
    }
    // If the password does not match the password stored in the database
    bcrypt.compare(PASSWORD, user[0].password).then((result) => {
      if (!result) {
        return next({
          log: 'userController.verifyUser: ERROR: invalid password',
          message: { err: 'ERROR: Invalid password' },
        });
      }
      if (!res.locals.users) res.locals.users = [];
      res.locals.users.push(user);
      return next();
    });
  });
};

module.exports = userController;
