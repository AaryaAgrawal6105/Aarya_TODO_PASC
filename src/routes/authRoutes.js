const express = require('express');
const authController = require('../controllers/authcontroller')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')


router.post('/signup'  ,authController.signup );
router.post('/signin' , authController.login);

module.exports = router