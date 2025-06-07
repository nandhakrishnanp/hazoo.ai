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
        ip : {
            type: String,
            default: null
        }
    }, 
    
},{
    timestamps: true,
    versionKey: false
});

// Set status to "Disconnected" for all vehicles every 10 minutes
setInterval(async () => {
    try {
        await mongoose.model('Vehicle').updateMany({}, { status: "Disconnected" });
    } catch (err) {
        console.error('Error updating vehicle status:', err);
    }
}, 10 * 60 * 1000); // 10 minutes in milliseconds



module.exports = mongoose.model('Vehicle', vehicleSchema);