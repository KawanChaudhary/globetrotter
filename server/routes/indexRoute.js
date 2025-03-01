const express = require('express');
const userRoutes = require('./userRoutes');
const quizRoutes = require('./quizRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/quiz', quizRoutes);

module.exports = router;