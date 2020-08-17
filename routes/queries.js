const User = require('../models/User');
const Poll = require('../models/Poll');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

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

exports.listPolls = (callback) => {
    Poll.find({}, {name : 1, isActive : 1, date : 1 }).lean().exec(function (err, polls){
        if(err){
            throw err; 
        }
        callback(polls)
    });
};

exports.activate = (_id, callback) => {
    Poll.updateMany({}, {isActive : false}).then(polls =>{
        Poll.findByIdAndUpdate(mongoose.Types.ObjectId(_id), {isActive : true}).lean().exec(function (err, poll){
            if(err){
                throw err; 
            }
            callback(poll)
        })
        Poll.find
    }); 
};


