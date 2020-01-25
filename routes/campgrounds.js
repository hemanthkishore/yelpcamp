const express = require('express');

// models
const Campground = require('../models/campgrounds');

const middleware = require('../middleware');

const router = express.Router();

// default campground page
router.get('/', async (req, res) => {
    try {
        // console.log(req.user);
        let allCampgrounds = await Campground.find({});
        res.render('../views/campgrounds/index.ejs', { campGrounds: allCampgrounds });
    } catch (error) {
        res.render({ "success": "false" });
    }

});

// Add a new campground
router.post('/', middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campground array
    // redirect back to campground page

    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }

    // campGrounds.push({ name, image });
    Campground.create({ name, image, description, author }).then(campground => {
        // add the author
        res.redirect('/campgrounds');
    }).catch(error => {
        res.send({ 'success': 'false' });
    })

});

// new page to add campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('../views/campgrounds/new.ejs');
});

// route to dispaly a new campground id
router.get('/:id', async (req, res) => {
    try {
        let campground = await Campground.findById(req.params.id).populate('comments').exec();
        // console.log(campground.author);
        res.render('../views/campgrounds/show.ejs', { campground });
    } catch (error) {
        res.render({ 'success': false })
    }
});

// Edit campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, function (error, campground) {
        res.render('campgrounds/edit', { campground });
    });
});

// update campground route
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (error, campground) {
        if (error) {
            res.redirect('/campgrounds');
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
});

// delete the campground
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    //TODO: Delete all the comments associated with the campground
    Campground.findByIdAndRemove(req.params.id, (error, campground) => {
        if (error) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
})

module.exports = router;