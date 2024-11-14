const mongoose = require('mongoose');
const {Schema , model} = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true }, 
  role: {
    type: String,
    enum: ['Admin', 'salemanger', 'Labour', 'HR']
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;