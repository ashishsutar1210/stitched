const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // For initial setup only, can be removed later

module.exports = router; 