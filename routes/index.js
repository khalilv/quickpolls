const express = require('express');
const router = express.Router();
const queries = require('./queries');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    })
});

//leaderboards page
router.get('/leaderboards', ensureAuthenticated, (req, res) => {
    res.render('leaderboards', {
        user: req.user,
    })
});

//contact page
router.get('/contact', ensureAuthenticated, (req, res) => {
    res.render('contact', {
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

router.get('/activePoll', ensureAuthenticated, (req, res) => {
    try {
        queries.getActivePoll(poll => {
            res.json({ success: true, poll: poll })
        });
    }
    catch (e) {
        res.json({ success: false, error: e });
    }
})

module.exports = router; 