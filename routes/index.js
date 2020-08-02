const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const queries = require('./queries');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Poll = require('../models/Poll');

//welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    user: req.user
}));

router.get('/leaderboards', ensureAuthenticated, (req, res) => {
    res.render('leaderboards', {
        user: req.user,
    })
});

router.get('/allUsers', ensureAuthenticated, (req, res) => {
    try {
        queries.getAllUserPoints(users => {
            res.json({ success: true, users: users })
        });
    }
    catch (e) {
        res.json({ success: false, error: e });
    }
});



router.get('/contact', ensureAuthenticated, (req, res) => res.render('contact', {
    user: req.user
}));

router.get('/admin', ensureAuthenticated, (req, res) => res.render('admin', {
    user: req.user
}));

router.post('/admin/newpoll', ensureAuthenticated, (req, res) => {
    const questions = req.body;
    console.log(req.body); 
    const new_poll = new Poll({
        questions
    });
    new_poll.save().then(poll => {
        res.json({ success: true, data: poll });
    }).catch(err => {
        res.json({ success: false, error: err });
    });
});
module.exports = router; 