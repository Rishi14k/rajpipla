const express = require('express');
const {register,login} = require('../controllers/authControllers')
const auth = require('../middleware/authM');

const router = express.Router();

router.post('/register',register);
router.post('/login',login);

module.exports = router;
