const AsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')
const registerUser =AsyncHandler(async(req,res) => {
    // get user data from the body
    const { name, email, password } = req.body;
    // validate that the user enters the field
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('please enter all the fields')
    }
    // check if the user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
        res.status(400);
        throw new Error('User already exists');
    }
    // hash the password
    // 1.generate the salt
    const salt = await bcrypt.genSalt(10);
    // 2. hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    // create the user
    const newUser = User.create({
        name,email,role:0,password:hashedPassword,
    })
    res.status(200).json({
        name, email, password:hashedPassword,role:newUser.role, token: generateToken(newUser._id),
    })
})

const loginUser = AsyncHandler(async (req, res) => {
    // get user data from the body
    const { email, password } = req.body;
    // find if the user exists
    const checkUser = await User.findOne({ email });
    if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
        res.status(200).json({
            _id:checkUser.id,
            name:checkUser.name,
            email:checkUser.email,
            password:checkUser.password,
            role:checkUser.role,
            token: generateToken(checkUser._id)
        })
    } else {
        res.status(401);
        throw new Error('Wrong credentials')
    }

});


const generateToken = (id) => {
    return jwt.sign({id},process.env.APP_SECRET,{expiresIn:'30d'})
}

const getSpecificUser = AsyncHandler(async(req,res) => {
    const { _id, name, email, role } = req.user;
    res.status(200).json({
        id: _id,
        name,
        email,
        role,
    })
})

const getAdmins =AsyncHandler(async(req, res) => {
    const admins = await User.find({ role: 0 });
    res.status(200).json({ admins });
})


module.exports = {
    registerUser,
    loginUser,
    getSpecificUser,
    getAdmins,
}