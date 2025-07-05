const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    if (!fullName || !email || !password) {
        res.status(400).json({ message: 'all fields required' });
    }
    try {
        //check email already exist
        const existEmail = await User.findOne({ email })
        if (existEmail) {
            res.status(400).json({ message: 'user already registered' });
        }
        //create new user
        const user = await User.create({
            fullName, email, password, profileImageUrl
        });
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'registration error' });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'all fields required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: 'login error' });
        console.log('Login error:', error)
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}