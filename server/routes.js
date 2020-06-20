require('../models/users');
const fs = require("fs");
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
const Users = mongoose.model('users');

module.exports = app => {

    app.get("/", (req, res) => {
        res.render("login.ejs", {
            title: "Quickpolls",
        });
    });

    app.post("/", [
        check('username')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        check('email')
            .isLength({ min: 1 })
            .withMessage("Please enter an email"),
        check('password')
            .isLength({ min: 1 })
            .withMessage("Please enter a password"),
    ], (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = new Users(req.body);
            user.save()
                .then(() => { res.send('Thank you for your registration!'); })
                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! Something went wrong.');
                });
        } else {
            res.render("login.ejs", {
                title: "Quickpolls",
            });
        }
    });

    app.get('/users', (req, res) => {
        Users.find()
            .then((users) => {
                res.render('users.ejs', { title: 'Listing users', users });
            })
            .catch(() => { res.send('Sorry! Something went wrong.'); });
    });

};