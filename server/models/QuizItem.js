const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const quizItemSchema = new mongoose.Schema({
  trivia: { type: String, required: true },
  options: [{type: String, required: true }],
  correctAnswer: { type: String, required: true },
  clue: {type: String, required: true},
  funFact: { type: String, required: true },
});

const QuizItem = mongoose.model("QuizItem", quizItemSchema);
module.exports = QuizItem;
