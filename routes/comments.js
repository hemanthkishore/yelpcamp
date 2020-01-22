const express = require('express');

// models
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');

const router = express.Router({ mergeParams: true });

// middleware functions
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

// route to create a new comment
router.get('/new', isLoggedIn, async (req, res) => {
    try {
        let campground = await Campground.findById(req.params.id);
        res.render('../views/comments/new.ejs', { campground });
    } catch (error) {
        console.log(error);
    }
})

router.post('/', isLoggedIn, async (req, res) => {
    try {
        let campground = await Campground.findById(req.params.id);
        // create a comment
        let comment = await Comment.create(req.body.comment);

        campground.comments.push(comment);
        await campground.save();

        res.redirect(`/campgrounds/${campground._id}`);

    } catch (error) {
        console.log(error);
        res.redirect('/campgrounds');
    }
});

module.exports = router;
