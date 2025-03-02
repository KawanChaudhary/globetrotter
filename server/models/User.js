const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  highestScore: { type: Number, default: 0 },
  attempts: [
    {
      date: { type: Date, default: Date.now },
      correct: { type: Number, required: true },
      score: { type: Number, required: true },
    },
  ],
  activeQuiz: {
    score: { type: Number, default: 0 },
    quizzes: [
      {
        quizItem: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizItem' },
        answer: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;