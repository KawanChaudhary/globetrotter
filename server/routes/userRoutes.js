const express = require('express');
const { register, login, refreshToken, getUser, checkUsername, logout } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/check-username/:username', checkUsername)
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/me', auth, getUser);
router.post('/logout', auth, logout);

module.exports = router;