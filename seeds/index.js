const mongoose = require('mongoose');
const Campground = require('./../models/campground')
const cities = require('./cities')
const {places, descriptors } = require('./../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.set('strictQuery', true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
    await Campground.deleteMany({}); // Delete everything from db
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000) 
        new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}` // make 50 random campsites
        })
        await campground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});