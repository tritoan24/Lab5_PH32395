var express = require('express');
const port = 3001;
var app = express();

app.use(express.json());


const mongoose = require('mongoose');
const RES = require('./COMON');
const uri = RES.uri;
const School = require('./School');

const api_School = require('./routes/api_School');
app.use('/api',api_School);



// view engine setup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
