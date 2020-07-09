const User = require('../models/User');

exports.getAllUserPoints = (callback) => {
    User.find({}, { name: 1, points: 1 }).lean().exec(function (err, users){
        if(err){
            throw err; 
        }
        callback(users); 
    })
};


