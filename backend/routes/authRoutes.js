const express = require('express');
const router = express.Router();
const{
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authControllers');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', getUserInfo)


module.exports = router;