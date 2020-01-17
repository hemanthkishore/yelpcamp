const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    seedDB = require('./seeds');

// Routes
const campgroundRouter = require('./routes/campgrounds');

// get the environment variables
require('dotenv').config();

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

// seed the database
// seedDB();

// Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Routes middleware
app.use('/campgrounds', campgroundRouter);

// Set the View engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/health-check', (req, res) => {
    res.send("Working");
})

// Start the app
app.listen(process.env.PORT, () => {
    console.log(`Yelpcamp server has started at port ${process.env.PORT} with env ${process.env.NODE_ENV}`);
});