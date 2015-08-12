var express = require('express');
var passport = require('passport');
var User = require('models/User');
var router = require('router');

module.exports.renderRegistration = function(req, res) {
  res.render('auth/register');
};

module.export.registerNewUser = function(req, res, next) {
  User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user) {
    if(err) return res.render('auth/register', {user: user});
      req.session.save(function(err) {
        if(err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};