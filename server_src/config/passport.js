const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const configAuth = require('./auth');
const schemaCtrl = require('../models/schema');

const mongoose = require('mongoose');
const url = "mongodb://admin:team5307@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/test?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";
const crypto = require('crypto');

let connection;

function connectToDb() {
  if(connection==null){
    mongoose.connect(url, { useNewUrlParser: true });
    connection = mongoose.connection;
  }
  let db = connection;
  db.on('error', () => {    
    console.log("Database connection failure");
    console.error.bind(console, 'connection error');
  });
  if(!db.readyState){
    return false;
  }
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
      if(!db){
        return done(true, null, "DB connection failure");        
      }
      db.once('open', () => {
        schemaCtrl.Profile.findOne({ uid : profile.id}, function(err, user) {
          if (err) return done(err, null);
          if (user){
            return done(null, user);
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
          user.save(function (err, newLog) {
            if (err) return done(error, null);
            else return done(null, user);
          });
        });
      });
    } catch(error) {
      return done(error, null);
    }
  }
));

module.exports = passport;
