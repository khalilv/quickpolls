const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Poll = require('../models/Poll');


router.get('/', ensureAuthenticated, (req, res) => res.render('admin', {
    user: req.user
}));


router.post('/newpoll', ensureAuthenticated, (req, res) => {
    let { name, questions } = req.body;
    questions = questions.trim().split('\r\n');
    const new_poll = new Poll({
        name,
        questions
    });
    new_poll.save().then(poll => {
        res.redirect('/admin');
    }).catch(err => {
        res.redirect('/admin');
    });
});

module.exports = router; 