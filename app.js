const express = require('express');
const bodyParser = require('body-parser');

// get the environment variables
require('dotenv').config();

// Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set the View engine
app.set('view engine', 'ejs');

// Global variables
let campGrounds = [
    { name: "Hemanth", image: "https://images.unsplash.com/photo-1576611209860-e3ad12547e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { name: "Kishore", image: "https://images.unsplash.com/photo-1576616305012-d698609d49db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=800&q=60" },
    { name: "Dasari", image: "https://images.unsplash.com/photo-1576616754092-990394cb6473?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=60" },
    { name: "Kranthi", image: "https://images.unsplash.com/photo-1576612411648-53d86c3da7bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=60" },
    { name: "Hemanth", image: "https://images.unsplash.com/photo-1576611209860-e3ad12547e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { name: "Kishore", image: "https://images.unsplash.com/photo-1576616305012-d698609d49db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=800&q=60" },
    { name: "Dasari", image: "https://images.unsplash.com/photo-1576616754092-990394cb6473?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=60" },
    { name: "Kranthi", image: "https://images.unsplash.com/photo-1576612411648-53d86c3da7bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=60" },
    { name: "Hemanth", image: "https://images.unsplash.com/photo-1576611209860-e3ad12547e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
    { name: "Kishore", image: "https://images.unsplash.com/photo-1576616305012-d698609d49db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=800&q=60" },
    { name: "Dasari", image: "https://images.unsplash.com/photo-1576616754092-990394cb6473?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=60" },
    { name: "Kranthi", image: "https://images.unsplash.com/photo-1576612411648-53d86c3da7bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=60" },
]

app.get('/', (req, res) => {
    res.render('landing');
});

app.post('/campgrounds', (req, res) => {
    // get data from form and add to campground array
    // redirect back to campground page

    let name = req.body.name;
    let image = req.body.image;

    campGrounds.push({ name, image });

    res.redirect('/campgrounds');
    // res.send('Success');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', { campGrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
});

// Start the app
app.listen(process.env.PORT, () => {
    console.log(`Yelpcamp server has started at port ${process.env.PORT}`);
});