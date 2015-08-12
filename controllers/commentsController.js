var passport = require('passport');
var Comments = require('../models/Comment');
var express= require('express');

module.exports.showComments = function(req, res) {
  Comment.find(function(error, comments) {
    if(err) return res.send(err); 
    res.render('comments/index', {comments: comments});
  });
};