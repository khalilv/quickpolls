const User = require('../models/User');
const Poll = require('../models/Poll');

exports.getAllUserPoints = (callback) => {
    User.find({}, { name: 1, points: 1 }).lean().exec(function (err, users){
        if(err){
            throw err; 
        }
        callback(users); 
    });
};

exports.getActivePoll = (callback) => {
    Poll.findOne({isActive : true}, {questions : 1, name : 1}).lean().exec(function(err,poll){
        if(err){
            throw err; 
        }
        callback(poll);
    });
};



