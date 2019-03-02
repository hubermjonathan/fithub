const express = require('express');
const app = express();
const router = require('./routes');

const passport = require('./config/passport');


app.use(passport.initialize());

app.use('/', router);

const port = 8000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

module.exports = app;
