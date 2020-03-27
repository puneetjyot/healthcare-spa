const mongoose = require('mongoose');

var Patient = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  image: String,
  medics: String,
  notes: String
});

var Patient = mongoose.model('Patient',Patient);

module.exports = {
  Patient
};
