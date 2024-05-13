const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const {showData} = require('../controllers/usersController');
const {login} = require('../controllers/usersController');
const {register} = require('../controllers/usersController');

router.get('/data', protect, showData);
router.post('/login', login);
router.post('/register', register);

module.exports = router;