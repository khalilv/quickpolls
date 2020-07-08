const express = require('express'); 
const router = express.Router(); 
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

//dashboard
router.get('/dashboard',ensureAuthenticated, (req, res) => res.render('dashboard', {
    user : req.user
})); 

router.get('/leaderboards',ensureAuthenticated, (req, res) => res.render('leaderboards', {
    user : req.user
})); 

router.get('/contact',ensureAuthenticated, (req, res) => res.render('contact', {
    user : req.user
})); 
module.exports = router; 