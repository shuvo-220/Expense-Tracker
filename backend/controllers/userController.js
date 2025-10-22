const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req, res)=>{
    const{name,email,password} = req.body;
    try {
        const user = await User.create({
            name,email,password
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.login = async(req, res)=>{
    const{email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(500).json('user not found');
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json('invalid email or password');
        }
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY,{expiresIn:'1d'})
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json(error.message);
    }
}