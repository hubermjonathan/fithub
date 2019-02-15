const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const configAuth = require('./auth')
const schemaCtrl = require('../models/schema')

const mongoose = require('mongoose');
const url = "mongodb://admin:team5307@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/test?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";


function connectToDb() {
  mongoose.connect(url, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  return db;
}

//Google Strategy for logging in
passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID             : configAuth.googleAuth.clientID,
    clientSecret          : configAuth.googleAuth.clientSecret,
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
      let db = connectToDb();
      db.once('open', () => {
        let user;
        user = schemaCtrl.ProfileSchema.findOne({ "google.id" : profile.id}, { pseudonym : 1 });
        if (user){
          console.log(user);
          return done(null, user);
        }
        console.log(profile);
        user = new schemaCtrl.ProfileSchema({
          name: profile.name.givenName + " " + profile.name.familyName,
          pseudonym: profile.displayName,
          avatar: profile._json.image.url,
          logs: null,
          //For authentication
          uid: profile.id,
          token : "abcd",
          email : profile.emails[0].value
        })        
        user.save(function (err, newLog) {
          //if (err) return res.status(500).send({ message: 'User unsuccessfully added' });
          //else res.status(200).send({ message: 'User successfully added' });
        });
      });
    } catch(error) {
      done(error, false, error.message);
    }
  }
));



module.exports = passport;