const mongoose = require('mongoose');



const vehicleSchema = new mongoose.Schema({
    vehicle_id: {
        type: String,
        required: true,
        unique: true
    },
    vehicle_type: {
        type: String,
        required: true
    },
    vehicle_number: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: "Disconnected"
    },
    mode:{
        type: String,
        default: "Automatic"
    },
    range :{
        type: Number,
        default: null
    },
    rtsp:{
        username: {
            type: String,
            default: null
        },
        password: {
            type: String,
            default: null
        },
    }, 
    
},{
    timestamps: true,
    versionKey: false
});



module.exports = mongoose.model('Vehicle', vehicleSchema);