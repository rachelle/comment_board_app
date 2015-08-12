var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();
var usersController = require('../controllers/usersController');
var sessionsController = require('../controllers/sessionsController');
var commentsController = require('../controllers/commentsController');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});

// GET registration page 
router.get('/register', usersController.renderRegistrationForm);

/*router.get('/register', function (req, res) {
  res.render('auth/register');
});*/

// creating a new user with the registration page
router.post('/register', usersController.renderRegisterNewUser);

/*router.post('/register', function (req, res) {
  User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user) {
    if (err) return res.render('auth/register', {user: user});
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});
*/

// Get login page 
router.get('/login', usersController.renderLoginPage);
/*router.get('/login', function (req, res) {
  res.render('auth/login', {user : req.user});
});
*/

// Login user 
router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),
  sessionsController.loginUser);
 /* function (req, res, next) {
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  }
);*/

// Logout User 

router.get('/logout', sessionsController.logout);

// get the comments index page
router.get('/comments/index', commentsController.showComments);

/*router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret', {user: req.user});
});

// middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the login page
  res.redirect('/login');
}*/

module.exports = router;
