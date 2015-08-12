var passport = require('passport');
var User = require('../models/User');
var express = require('express');

// renders the login page
module.exports.renderLoginPage = function(req, res) {
  res.render('auth/login', {user: req.user});
};


// renders login for current user 
module.exports.loginUser = function (req, res, next) {
  req.session.save(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
};

// when user ends session redirects to root page
module.exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

// middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the login page
  res.redirect('/login');
}