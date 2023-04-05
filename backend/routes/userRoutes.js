const express = require('express');
const { loginUser, registerUser, getSpecificUser } = require('../controllers/userController');
const {protect} = require('../middlewares/authorizationMiddleware');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/getUser',protect, getSpecificUser);

module.exports = router;