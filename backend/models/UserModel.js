const mongoose = require('mongoose');
// create user model
const UserModel = mongoose.Schema({
    name: {
        type: String,
        required:[true,'please enter all the fields'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email',],
        unique:true,
    },
    password: {
        type: String,
        required:[true,'Please enter a password'],
    },
    role:{
        type: Number,
        default: 0,
    }

},
    {
        timestamps:true
    }
    
)

module.exports = mongoose.model('User', UserModel);