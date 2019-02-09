const mongoose = require('mongoose');
const schemaCtrl = require('../models/schema');
const url = "mongodb://admin:<PASSWORD>@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/test?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";

function connectToDb() {
  mongoose.connect(url, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  return db;
}

let register = function register(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}
let login = function login(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}
let newWorkout = function newWorkout(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}

let newExercise = function newExercise(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}
let logWorkout = function logWorkout(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}
let workouts = function workouts(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}
let workoutDetails = function workoutDetails(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}

module.exports = apiCtrl;
