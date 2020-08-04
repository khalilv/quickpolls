const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    points: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    takenActivePoll : {
        type: Boolean, 
        default : false
    }, 
    answers : {
        type : Object, 
        required : false, 
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User; 