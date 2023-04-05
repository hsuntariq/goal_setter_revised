const mongoose = require('mongoose');
const color = require('colors')
const connectDB = async () => {
    try {
        let connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('database connected on ' + mongoose.connection.host.green)
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = connectDB;