const express = require('express');

// models
const Campground = require('../models/campgrounds');

const router = express.Router();

// default campground page
router.get('/', async (req, res) => {
    console.log("Inside")
    try {
        let allCampgrounds = await Campground.find({});
        res.render('../views/campgrounds/index.ejs', { campGrounds: allCampgrounds });
    } catch (error) {
        res.render({ "success": "false" });
    }

});

// Add a new campground
router.post('/', (req, res) => {
    // get data from form and add to campground array
    // redirect back to campground page

    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;

    // campGrounds.push({ name, image });
    Campground.create({ name, image, description }).then(campground => {
        res.redirect('/campgrounds');
    }).catch(error => {
        res.send({ 'success': 'false' });
    })

});

// new page to add campground
router.get('/new', (req, res) => {
    res.render('../views/campgrounds/new.ejs');
});

// route to dispaly a new campground id
router.get('/:id', async (req, res) => {
    try {
        let campground = await Campground.findById(req.params.id);
        res.render('../views/campgrounds/show.ejs', { campground });
    } catch (error) {
        res.render({ 'success': false })
    }
});


module.exports = router;