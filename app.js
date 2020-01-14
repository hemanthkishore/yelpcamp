const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// get the environment variables
require('dotenv').config();

// Routes
const campgrounds = require('./routes/campgrounds');

// Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Routes middleware
app.use('/campgrounds', campgrounds);

// Set the View engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('landing');
});

// Start the app
app.listen(process.env.PORT, () => {
    console.log(`Yelpcamp server has started at port ${process.env.PORT} with env ${process.env.NODE_ENV}`);
});