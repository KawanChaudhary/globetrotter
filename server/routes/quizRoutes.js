const express = require('express');
const { getRandomQuiz, getClue, updateCurrentScore } = require('../controllers/quizController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/random', authenticate, getRandomQuiz);
router.get('/clue/:id', authenticate, getClue);
router.post('/update-score', authenticate, updateCurrentScore);

module.exports = router;