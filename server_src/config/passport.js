const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const configAuth = require('./auth');
const schemaCtrl = require('../models/schema');

const mongoose = require('mongoose');
const url = "mongodb://admin:team5307@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/test?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";

const crypto = require('crypto');

function connectToDb() {
  mongoose.connect(url, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', () => {
    res.status(500).send({ "message" : "Database is down"});
    db.removeAllListeners();
    return console.error.bind(console, 'connection error');
  });
  return db;
}

//Google Strategy for logging in
passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID             : configAuth.googleAuth.clientID,
    clientSecret          : configAuth.googleAuth.clientSecret,
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
      let db = connectToDb(res);
      db.once('open', () => {
        schemaCtrl.Profile.findOne({ uid : profile.id}, function(err, user) {
          if (err) return handleError(err);
          if (user){
            //console.log("----------Found user----------\n" + user + "\n------------------------------");
            return done(null, user, false);
          }
          let token = crypto.randomBytes(48).toString('hex');
          user = new schemaCtrl.Profile({
            name: profile.name.givenName + " " + profile.name.familyName,
            pseudonym: profile.displayName,
            avatar: profile._json.image.url,
            //For authentication
            uid: profile.id,
            token : token,
            email : profile.emails[0].value
          })
          //console.log("----------Saving user----------\n" + user + "\n------------------------------");        
          user.save(function (err, newLog) {
            if (err) return done(error, null, error.message);
            else return done(null, user, true);
          });
        });
      });
    } catch(error) {
      done(error, null, error.message);
    }
  }
));



module.exports = passport;
