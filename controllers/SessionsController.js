const User = require('../models/user');
const passport = require('passport');
const viewPath = 'sessions';
const jwt = require('jsonwebtoken')

// Step 1: Add the login logic
exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
      pageTitle: 'Login'
    });
  };

// Step 2: Add the authentication logic
exports.create = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err||!user) return res.status(401).json({
      status: 'failed',
      message: 'not authorized',
      error: err
    });

  
    req.login(user, err => {
      if (err) return res.status(401).json({
        status: 'failed',
        message: 'not authorized',
        error: err
      });

     
      return res.status(200).json({
        status: 'sucess',
        message: 'Logged in successfully',
        user :{
          _id: user._id,
          fullname: user.fullname,
          email: user.email
        }
      })

    })

  })(req, res, next);
  };


// Step 3: Add the logout logic
exports.delete = (req, res) => {
    req.logout();
    req.flash('success', 'You were logged out successfully.');
    res.redirect('/');
  };
