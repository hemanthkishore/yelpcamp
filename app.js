const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const seedDB = require('./seeds');

// Routes
const campgroundRouter = require('./routes/campgrounds');
const commentRouter = require('./routes/comments');
const authRouter = require('./routes/index');

// Models
const User = require('./models/user');

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
// set the public directory
app.use(express.static(path.join(__dirname, '/public')));
// Set the View engine
app.set('view engine', 'ejs');

// Passport Configuration
app.use(require('express-session')({
    secret: "this is my secret key",
    resave: false,
    saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Routes middleware
app.use(authRouter);
app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:id/comments', commentRouter);

// middleware functions
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

app.use(function (req, res, next) {
    // console.log(req.user);
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/health-check', (req, res) => {
    console.log(req.isAuthenticated())
    console.log(req.user);
    res.send("Working");
});


// Start the app
app.listen(process.env.PORT, () => {
    console.log(`Yelpcamp server has started at port ${process.env.PORT} with env ${process.env.NODE_ENV}`);
});