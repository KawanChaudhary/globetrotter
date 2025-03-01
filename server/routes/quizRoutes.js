const express = require('express');
const { getQuizItems, getClue, checkAnswers } = require('../controllers/quizController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/get', auth, getQuizItems);
router.get('/:id/clue', auth, getClue);
router.post('/check-answers', auth, checkAnswers);

module.exports = router;