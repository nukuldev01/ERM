const express = require('express');
const User = require('../models/user');
const { UserLogin, UserCreate } = require('../controllers/user');
const router = express.Router();

router.post('/adminsignup', UserCreate);

router.post('/adminlogin', UserLogin);

module.exports = router;