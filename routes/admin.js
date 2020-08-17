const express = require('express');
const router = express.Router();
const queries = require('./queries');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Poll = require('../models/Poll');


router.get('/', ensureAuthenticated, (req, res) => res.render('admin', {
    user: req.user
}));

router.get('/listPolls', ensureAuthenticated, (req, res) => {
    try {
        queries.listPolls(polls => {
            res.json({ success: true, polls: polls })
        });
    }
    catch (e) {
        res.json({ success: false, error: e });
    }
});

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

router.post('/activatepoll', ensureAuthenticated, (req, res) => {
    let {id} = req.body;
    try {
        queries.activate(id,poll => {
            res.json({success : true});
        });
    }
    catch (e) {
        res.json({success : false, error : e});
    }
})

module.exports = router; 