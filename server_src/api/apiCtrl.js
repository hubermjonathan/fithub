import mongoose from 'mongoose';
import schemaCtrl from '../models/schema';
import url from './config';

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

export default apiCtrl;
