const QuizItem = require("../models/QuizItem");
const User = require("../models/User");

exports.getRandomQuiz = async (req, res) => {
  const userId = req.user.id;

  try {
    const quizItem = await QuizItem.aggregate([{ $sample: { size: 1 } }]);
    if (!quizItem || quizItem.length === 0) {
      return res.status(404).json({ message: "Quiz item not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.currentScore = 0;
    await user.save();

    const quizData = {
      id: quizItem[0]._id,
      trivia: quizItem[0].trivia,
      options: quizItem[0].options,
      currentScore: user.currentScore,
    };

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

exports.updateCurrentScore = async (req, res) => {
  const { answer, usedClue } = req.body;
  const userId = req.user.id;

  try {
    const quizItem = await QuizItem.findById(answer.id);
    if (!quizItem) {
      return res.status(404).json({ message: "Quiz item not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (usedClue && quizItem.correctAnswer === answer.answer) {
      user.currentScore += 1;
    } else if (quizItem.correctAnswer === answer.answer) {
      user.currentScore += 3;
    }

    await user.save();

    const quizDataRem = {
      correctAnswer: quizItem.correctAnswer,
      clue: quizItem.clue,
    };

    res.status(200).json({ currentScore: user.currentScore, quiz: quizDataRem });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
