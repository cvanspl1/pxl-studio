const Session = require('../models/sessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  if (!req.cookies.ssid) {
    return res.status(200).redirect('/signup');
  }
  Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
    if (err) {
      return res.status(200).redirect('/signup');
    }
    return next();
  });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  // write code here
  Session.create({ cookieId: res.locals.id });
  return next();
};

module.exports = sessionController;
