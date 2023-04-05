const mongoose = require('mongoose');

const goalModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    goal: {
        type: String,
        required:[true,'please input all the fields']
    }
}, {
    timestamps:true,
})

module.exports = mongoose.model('Goal',goalModel)