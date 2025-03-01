const QuizItem = require("../models/QuizItem");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getQuizItems = async (req, res) => {
  const { quizSize = 10 } = req.body;
  try {
    const quizItems = await QuizItem.aggregate([
      { $sample: { size: quizSize } },
    ]);
    const quizData = quizItems.map((item) => ({
      id: item._id,
      trivia: item.trivia,
      options: item.options,
      funFact: item.funFact,
    }));

    res.status(200).json(quizData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getClue = async (req, res) => {
  const { id } = req.params;

  try {
    const quizItem = await QuizItem.findById(id);
    if (!quizItem) {
      return res.status(404).json({ message: "Quiz item not found" });
    }
    res.status(200).json({ clue: quizItem.clue });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkAnswers = async (req, res) => {
  const { answers } = req.body;
  const userId = req.user.id;

  try {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    const results = [];

    for (const answer of answers) {
      const quizItem = await QuizItem.findById(answer.id);
      if (!quizItem) {
        results.push({
          id: answer.id,
          correct: false,
          message: "Quiz item not found",
        });
        continue;
      }

      let isCorrect = false;
      if (answer.usedClue) {
        score += 1;
      } else if (quizItem.correctAnswer === answer.answer) {
        score += 3;
        isCorrect = true;
        correct++;
      } else if (answer.answer === null || answer.answer === undefined) {
        unattempted++;
      } else {
        incorrect++;
      }

      results.push({
        id: answer.id,
        trivia: quizItem.trivia,
        options: quizItem.options,
        funFact: quizItem.funFact,
        userAnswer: answer.answer,
        usedClue: answer.usedClue,
        correctAnswer: quizItem.correctAnswer,
        correct: isCorrect,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.numberOfAttempts += 1;
    if (score > user.highestScore) {
      user.highestScore = score;
    }

    user.attempts.push({
      numberOfQuestions: answers.length,
      correct,
      incorrect,
      unattempted,
      score,
    });

    await user.save();

    res.status(200).json({ score, results });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
