const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async(req, res, next)=>{
    let token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).json({message:'unauthorized token'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next();
    } catch (error) {
        res.status(400).json({message:'no authorized token'}, error.message);
    }
}