
const mongoose = require('mongoose');
// connect to mongoose
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

const userProfileSchema = new mongoose.Schema({
    name: { firstName: String, lastName: String },
    mobilenumber: Number,
    age: Number,
    address: String,
    country: String
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

const insertToDB = () => {
    let startTime = new Date();

    for (let index = 0; index < 100000; index++) {

        let profile = {
            name: { firstName: `Hemanth-${index}`, lastName: "Kishore" },
            mobilenumber: 7259132281,
            age: index % 30,
            address: "College Road, Mancherial",
            country: "Inida"
        }

        UserProfile.create(profile)
    }

    let endTime = new Date();

    console.log((endTime - startTime) / 1000, "Time taken")
}

const readFromDB = async () => {
    let startDate = new Date();

    let result = await UserProfile.find()

    console.log(result.length)

    let endDate = new Date()

    console.log((endDate - startDate) / 1000, "Time taken")
}

insertToDB();
// readFromDB();