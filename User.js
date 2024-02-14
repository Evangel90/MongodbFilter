const mongoose = require('mongoose');

const userSchema = {
    name: {
      type: String,
      required: true,
      unique: true
    },
    registrationDate: {
      type: Date,
      required: true
    }
  };

module.exports = mongoose.model('User', userSchema);