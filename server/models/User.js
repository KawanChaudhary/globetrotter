const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  numberOfQuestions: { type: Number, required: true },
  correct: { type: Number, required: true },
  incorrect: { type: Number, required: true },
  unattempted: { type: Number, required: true },
  score: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  numberOfAttempts: { type: Number, default: 0 },
  highestScore: { type: Number, default: 0 },
  currentScore: { type: Number, default: 0 },
  attempts: [attemptSchema]
});

module.exports = mongoose.model('User', userSchema);