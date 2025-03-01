const QuizItem = require("../models/QuizItem");
const User = require("../models/User");

exports.getRandomQuiz = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if activeQuiz exists and if the last quiz is unanswered
    if (
      user.activeQuiz &&
      user.activeQuiz.quizzes &&
      user.activeQuiz.quizzes.length > 0
    ) {
      const lastQuiz =
        user.activeQuiz.quizzes[user.activeQuiz.quizzes.length - 1];
      const timeElapsed =
        (Date.now() - new Date(lastQuiz.createdAt).getTime()) / 1000 / 60; // in minutes

      if (timeElapsed > 5) {
        if (user.activeQuiz.score !== 0)
          user.attempts.push({
            date: new Date(),
            correct: user.activeQuiz.quizzes.filter(
              (q) => q.answer && q.answer === q.quizItem.correctAnswer
            ).length,
            score: user.activeQuiz.score,
          });
        user.activeQuiz = null;
        await user.save();
        return res.status(400).json({ message: "Quiz session timed out" });
      }

      if (!lastQuiz.answer) {
        const quizItem = await QuizItem.findById(lastQuiz.quizItem._id);
        return res.status(200).json({
          currentScore: user.activeQuiz.score,
          quiz: {
            id: quizItem._id,
            trivia: quizItem.trivia,
            options: quizItem.options,
            funFact: quizItem.funFact,
          },
        });
      }
    }

    // Get a new random quiz
    const quizItem = await QuizItem.aggregate([{ $sample: { size: 1 } }]);
    if (!quizItem || quizItem.length === 0) {
      return res.status(404).json({ message: "Quiz item not found" });
    }

    if (!user.activeQuiz) {
      user.activeQuiz = {
        score: 0,
        quizzes: [],
        createdAt: new Date(),
      };
    }

    if (!user.activeQuiz.quizzes) {
      user.activeQuiz.quizzes = [];
    }

    if (!quizItem || quizItem.length === 0) {
      return res.status(404).json({ error: "Quiz item not found" });
    }

    user.activeQuiz.quizzes.push({
      quizItem: quizItem[0]._id,
      createdAt: new Date(),
      answer: null,
    });

    // Mark the field as modified
    user.markModified("activeQuiz");

    // Save user
    await user.save();
    const quizData = {
      currentScore: user.activeQuiz.score,
      quiz: {
        id: quizItem[0]._id,
        trivia: quizItem[0].trivia,
        options: quizItem[0].options,
        funFact: quizItem[0].funFact,
      },
    };

    res.status(200).json(quizData);
  } catch (error) {
    console.log(error);
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
  const { answer } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate(
      "activeQuiz.quizzes.quizItem"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lastQuiz =
      user.activeQuiz.quizzes[user.activeQuiz.quizzes.length - 1];
    const quizItem = await QuizItem.findById(lastQuiz.quizItem._id);
    const timeElapsed =
      (Date.now() - new Date(lastQuiz.createdAt).getTime()) / 1000 / 60; // in minutes

    if (timeElapsed > 5 || quizItem.correctAnswer !== answer.answer) {
      const quizData = {
        currentScore: user.activeQuiz.score,
        quiz: {
          id: quizItem._id,
          trivia: quizItem.trivia,
          options: quizItem.options,
          funFact: quizItem.funFact,
          clue: quizItem.clue,
          correctAnswer: quizItem.correctAnswer,
        },
      };
      if (user.activeQuiz.score !== 0)
        user.attempts.push({
          date: new Date(),
          correct: user.activeQuiz.quizzes.filter(
            (q) => q.answer && q.answer === q.quizItem.correctAnswer
          ).length,
          score: user.activeQuiz.score,
        });
      user.highestScore = Math.max(user.highestScore, user.activeQuiz.score);
      user.activeQuiz = null;
      await user.save();
      return res.status(200).json(quizData);
    }

    if (lastQuiz.answer) {
      return res.status(400).json({ message: "Quiz already answered" });
    }

    if (!quizItem) {
      return res.status(404).json({ message: "Quiz item not found" });
    }

    if (answer.usedClue && quizItem.correctAnswer === answer.answer) {
      user.activeQuiz.score += 1;
    } else if (quizItem.correctAnswer === answer.answer) {
      user.activeQuiz.score += 3;
    }

    lastQuiz.answer = answer.answer;
    await user.save();

    const quizData = {
      currentScore: user.activeQuiz.score,
      quiz: {
        id: quizItem._id,
        trivia: quizItem.trivia,
        options: quizItem.options,
        funFact: quizItem.funFact,
        clue: quizItem.clue,
        correctAnswer: quizItem.correctAnswer,
      },
    };

    res.status(200).json(quizData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
