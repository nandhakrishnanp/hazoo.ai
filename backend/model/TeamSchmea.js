const mongoose = require('mongoose');




const Team = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    }
})


const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [Team]

});


module.exports = mongoose.model('Team', TeamSchema);