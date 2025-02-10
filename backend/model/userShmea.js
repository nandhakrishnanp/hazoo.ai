const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model('user', userSchema);