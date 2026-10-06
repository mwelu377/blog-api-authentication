const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// SIGN UP
router.post('/signup', signup);

// LOGIN
router.post('/login', login);

module.exports = router;