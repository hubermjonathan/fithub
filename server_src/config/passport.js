const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const configAuth = require('./auth')
const schemaCtrl = require('../models/schema')

//Google Strategy for logging in
passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID             : configAuth.googleAuth.clientID,
    clientSecret          : configAuth.googleAuth.clientSecret,
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
      console.log('profile.id', profile.id);
      let user;
      let user = await schema.ProfileSchema.findOne({ "google.id" : profile.id});
      if (user){
        return done(null, user);
      }
      user = new schemaCtrl.ProfileSchema ({
        name: profile.displayName,
        pseudonym: { type: String, required: true },
        avatar: profile._json.image,
        logs: [{ type: Schema.Types.ObjectId, ref: "LogSchema"}],
        //For authentication
        uid: profile.id,
        token : { type: String, required: true},
        email : { type: String, required: true}
      })
      console.log(user);
    } catch(error) {
      done(error, false, error.message);
    }
  }
));



module.exports = passport;