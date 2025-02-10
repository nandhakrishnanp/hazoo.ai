const mogoose = require('mongoose');
const adminSchema = new mogoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
});


module.exports = mogoose.model('admin', adminSchema);