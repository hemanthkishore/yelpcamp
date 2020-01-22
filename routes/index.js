const express = require('express');
const passport = require('passport');

// models
const User = require('../models/user');

const router = express.Router();

// auth routes
router.get('/register', (req, res) => {
    // res.send("Testing")
    console.log("Inside");
    // res.render('./views/campgrounds/index.ejs');
    res.render('register');
});

router.post('/register', (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect('/campgrounds');
        })
    });
});

// show the login form
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate("local", {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {

});

// logout route
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/campgrounds');
})

module.exports = router;