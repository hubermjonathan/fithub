const mongoose = require('mongoose');
const schemaCtrl = require('../models/schema');
const url = "URL";

function connectToDb() {
  mongoose.connect(url, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  return db;
}

// FORMAT
// let NAME = function NAME(req, res) {
//   let db = connectToDb();
//   db.once('open', () => {
//     DO STUFF HERE
//   });
// }

let apiCtrl = {
};

module.exports = apiCtrl;
