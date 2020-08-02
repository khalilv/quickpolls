const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    questions: {
        type: [String],
        required: true
    }
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll; 