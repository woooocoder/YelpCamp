const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')
const axios = require('axios')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 49; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '649b78408714c32234f289b2',
            location: `${cities[random].city}, ${cities[random].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
          price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/doix67ort/image/upload/v1687298815/owcnoymdiz4h9kuwhkc8.jpg',
                    filename: 'owcnoymdiz4h9kuwhkc8'
                },
                {
                    url: 'https://res.cloudinary.com/doix67ort/image/upload/v1687302801/YelpCamp/imd8nap29r6tjyhtq2w6.jpg',
                    filename: 'YelpCamp/imd8nap29r6tjyhtq2w6'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})