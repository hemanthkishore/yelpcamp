// file to seed data into database

const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');

const data = [
    {
        name: "Hemanth",
        image: "https://cdn.pixabay.com/photo/2020/01/03/13/49/grass-4738141__480.jpg",
        description: "This is a test site"
    },
    {
        name: "kishore",
        image: "https://cdn.pixabay.com/photo/2020/01/14/08/34/forest-4764438__480.jpg",
        description: "This is a test site"
    },
    {
        name: "dasari",
        image: "https://cdn.pixabay.com/photo/2020/01/07/06/22/peacock-4746848__480.jpg",
        description: "This is a test site"
    },
    {
        name: "pranavi",
        image: "https://cdn.pixabay.com/photo/2020/01/14/17/17/kyrgyzstan-4765706__480.jpg",
        description: "This is a test site"
    },
    {
        name: "Hemanth",
        image: "https://cdn.pixabay.com/photo/2020/01/03/13/49/grass-4738141__480.jpg",
        description: "This is a test site"
    },
    {
        name: "kishore",
        image: "https://cdn.pixabay.com/photo/2020/01/14/08/34/forest-4764438__480.jpg",
        description: "This is a test site"
    },
    {
        name: "dasari",
        image: "https://cdn.pixabay.com/photo/2020/01/07/06/22/peacock-4746848__480.jpg",
        description: "This is a test site"
    },
    {
        name: "pranavi",
        image: "https://cdn.pixabay.com/photo/2020/01/14/17/17/kyrgyzstan-4765706__480.jpg",
        description: "This is a test site"
    }
]

const pushdatatodb = () => {
    return new Promise(resolve => {
        Campground.insertMany(data).then((res) => {
            res.forEach(campground => {
                Comment.create({
                    text: "This is a good campground",
                    author: "Hemanth"
                }).then(comment => {
                    campground.comments.push(comment);
                    campground.save();
                    return resolve();
                });
            });
        }).catch(() => {
            return resolve();
        })
    });
}

const seedDB = async () => {
    try {
        // remove all campgrounds
        await Campground.deleteMany({});
        // add campgrounds
        await pushdatatodb();
        // add comments

    } catch (error) {
        console.log("error", error);
    }
}

module.exports = seedDB;