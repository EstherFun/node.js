const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    tutorialDate: {
      type: Date,
      required: true
    },
    tutorialTime: {
      type: String,
      required: true
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Student',
      required: true,
      validate: {
        validator: function (students) {
          return students.length >= 1 && students.length <= 5;
        },
        message: 'At least one student and at most five students are allowed per tutorial.'
      }
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true
    },
    fee: {
      type: Number,
      required: true
    },
    tutorialNumber: {
      type: String,
      required: true
    },
    attendance: {
      type: String,
      enum: ['Attended', 'Cancelled', 'No Show'],
      required: true
    },
    tutorialSubject: {
      type: String,
      enum: ['English', 'Irish', 'Maths', 'Biology', 'Chemistry', 'Physics', 'Computer Science', 'Other'],
      required: true
    },
    tutorialNotes: {
      type: String
    }
  });
  module.exports = mongoose.model('Tutorial', tutorialSchema);