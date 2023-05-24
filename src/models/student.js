const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  town: { type: String, required: true },
  county: { type: String, required: true },
  eircode: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  parentName: { type: String },
  virtualAttendance: { type: String },
  gender: { type: String, required: true },
  otherGender: { type: String },
  subject: { type: String, required: true },
  otherSubject: { type: String },
});
  module.exports = mongoose.model('Student', studentSchema);