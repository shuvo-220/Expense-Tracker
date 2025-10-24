const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.auth = async(req, res, next)=>{
    try {
        let token = req.headers.authorization?.split(" ")[1]
        if(!token){
            res.status(400).json('no token found');
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decode.id).select('-password')
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json(error.message)
    }
}