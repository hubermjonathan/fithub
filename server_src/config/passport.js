const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const configAuth = require('./auth')

//Google Strategy for logging in
passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID             : configAuth.googleAuth.clientID,
    clientSecret          : configAuth.googleAuth.clientSecret,
  },
  async(accessToken, refreshToken, profile, done) => {
    try {

      console.log('profile', profile);
  
    } catch(error) {
      done(error, false, error.message);
    }
  }
));

module.exports = passport;