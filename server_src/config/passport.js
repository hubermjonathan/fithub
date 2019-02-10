var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

var configAuth = require('./auth')

passport.use(new GoogleStrategy({
        consumerKey             : configAuth.googleAuth.clientID,
        consumerSecret          : configAuth.googleAuth.clientSecret,
        callbackURL             : configAuth.googleAuth.callbackURL,
        passReqToCallback       : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));