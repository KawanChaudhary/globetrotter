const express = require('express');
const { register, login, refreshToken, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/me', auth, getUser);

module.exports = router;