const mongoose = require('mongoose'); 
const PollSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    questions: {
        type: [String],
        required: true
    }, 
    name : {
        type : String, 
        required : true
    },
    isActive : {
        type : Boolean, 
        default : false
    },
    answers : {
        type : [Boolean], 
        required : false
    }
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll; 