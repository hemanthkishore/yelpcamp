const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');

let middlewareObj = {}

// middleware functions
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');
}

// Check campground ownership
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to be logged in to do that!');
        return res.redirect('back');
    } else {
        Campground.findById(req.params.id, function (error, campground) {
            if (error) {
                req.flash('error', 'Campground not found!');
                res.redirect('back');
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash('error', 'You dont have permission to do that!');
                    res.redirect('back')
                }

            }
        });
    }
}

// Comment middleware
middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id).then((comment) => {
            if (comment.author.id.equals(req.user.id)) {
                next();
            } else {
                res.redirect('back');
            }
        }).catch(error => {
            res.redirect('back');
        })
    } else {
        res.redirect('back');
    }
}

module.exports = middlewareObj;