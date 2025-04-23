const mongoose = require('mongoose');


const hazardSchema = new mongoose.Schema({
    cctv_id: {
        type: String,
        default: null
    },
    image:{
        type: String,
        required: true
    },
    isUser_reported: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        default: null
    },
    discription:{
        type: String,
        default: null
    },
    hazard_type: {
        type: String,
        required: true
    },
    resolvedImage:[
        {
            type: String,
            default: null
        }
    ],
    location:{
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    completed_at:{
        type: Date,
        default: null
    },
    status: {
        type: String,
        default: "Active"
    }
})


module.exports = mongoose.model('hazard', hazardSchema);