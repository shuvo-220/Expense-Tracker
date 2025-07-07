const express = require('express');
const router = express.Router();
const{
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authControllers');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect, getUserInfo)
const upload = require('../middleware/uploadMiddleware');


router.post('/upload-image', upload.single('image'), (req, res)=>{
    console.log('REQ FILE:', req.file);
    if(!req.file){
        return res.status(400).json({message:'no file uploaded'})
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    res.status(200).json({imageUrl})
})


module.exports = router;