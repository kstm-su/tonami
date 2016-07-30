import express from 'express';
import logger from 'morgan';
import {MongoClient} from 'mongodb';

/* initialize app server */
const app = express();
app.use(logger('dev'));
app.use(express.static('public'));

/* connect mongodb server*/
var db;
MongoClient.connect('mongodb://localhost:27017/sensor', (err, res) => {
  if (err) {
    return console.error(err);
  }
  db = res.collection('data');
});

/* REST API */
app.get('/data', (req, res) => {
  db.find({}).toArray((err, docs) => {
    res.json(docs.sort((a, b) => a.date - b.date));
  });
});

/* errors */
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.end(err.message);
});

/* listen */
app.listen(3000, () => console.log('Listening on port 3000'));
