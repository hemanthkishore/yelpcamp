const mongoose = require('mongoose');

// Schema 
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        "username": String
    },
    price: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;