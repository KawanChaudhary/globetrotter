const express = require('express');
const userRoutes = require('./userRoutes');
const quizRoutes = require('./quizRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/quiz', quizRoutes);
router.use('/leaderboard', leaderboardRoutes)

module.exports = router;