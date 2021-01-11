const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://theocop:8kp457co99@cluster0.oyhg9.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("on est connecter");// we're connected!
});