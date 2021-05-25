const cookieController = {};
const User = require('../models/userModel');

cookieController.setCookie = (req, res, next) => {
  // write code here
  const random = Math.random() * 100;
  res.status(200).cookie('codesmith', 'hi');
  res.cookie('secret', random);
  return next();
};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return next({
        log: `cookieController.setSSIDCookie: Error in  ${JSON.stringify(err)}`,
        message: { err: 'cookieController.setSSIDCookie: ERROR: Check server logs for details' },
      });
    }
    res.status(200).cookie('ssid', user.id, { httpOnly: true });
    return next();
  });
};

module.exports = cookieController;
