const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const users = require('./routes/users');
const config = require('./config/database');


//Connect
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=> {
  console.log('Mongoose default connection open to ' + config.database);
})

mongoose.connection.on('error', (e) => {
  console.log('Connect to database error : ' + e);
});

//Body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(cors());
app.use('/users', users);

//set static folder file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=> {
  console.log('Server running on port ' + port);
});

app.get('/', (req, res)=> {
  res.send('Invalid Endpoint');
});
