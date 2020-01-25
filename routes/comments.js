const express = require('express');

// models
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');

const middleware = require('../middleware');

const router = express.Router({ mergeParams: true });

// route to display a form create a new comment
router.get('/new', middleware.isLoggedIn, async (req, res) => {
    try {
        let campground = await Campground.findById(req.params.id);
        res.render('../views/comments/new.ejs', { campground });
    } catch (error) {
        console.log(error);
    }
})

// create a new comment
router.post('/', middleware.isLoggedIn, async (req, res) => {
    try {
        let campground = await Campground.findById(req.params.id);
        // create a comment
        let comment = await Comment.create(req.body.comment);
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        await comment.save();
        campground.comments.push(comment);
        await campground.save();
        console.log("comment", comment);
        res.redirect(`/campgrounds/${campground._id}`);

    } catch (error) {
        console.log(error);
        res.redirect('/campgrounds');
    }
});

// page to Edit a comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, async function (req, res, ) {
    try {
        let campground = await Campground.findById(req.params.id);
        let comment = await Comment.findById(req.params.comment_id);

        res.render('comments/edit.ejs', { campground, comment });
    } catch (error) {
        res.redirect('back');
    }
});

// updaet edit 
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findOneAndUpdate(req.params.comment_id, req.body.comment).then((comment) => {
        res.redirect(`/campgrounds/${req.params.id}`)
    }).catch(error => {
        res.redirect('back');
    })
});

// Delete route
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id).then(() => {
        res.redirect(`/campgrounds/${req.params.id}`);
    }).catch(error => {
        res.redirect('back');
    });
});

module.exports = router;
