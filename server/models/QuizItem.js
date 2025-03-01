const mongoose = require("mongoose");

const quizItemSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  trivia: { type: String, required: true },
  options: [{type: String, required: true }],
  correctAnswer: { type: String, required: true },
  clue: { type: String, required: true },
  funFact: { type: String, required: true },
});

const QuizItem = mongoose.model("QuizItem", quizItemSchema);
module.exports = QuizItem;
