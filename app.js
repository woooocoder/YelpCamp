const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const morgan = require('morgan');
const { error } = require('console');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to db')
})
.catch(e => {
    console.log('Error')
    console.log(e)
})
mongoose.set('strictQuery', true);




const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'))

// ./views/home
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makeCampground', async (req, res) => {
    const camp = new Campground({
        title: 'My Backyard',
        description: 'Cheap camping'
    });
    await camp.save();
    res.send(camp);
});

app.get('/campgrounds', async (req, res) => {
    const campground = await Campground.find({});
    res.render('campgrounds/index', {campground});
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground_.id}`);
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    app.render('campgrounds/show', {campground});
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
})

app.put('/campgrounds/:id', async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})


app.listen(3000, () => {
    console.log("Serving on port 3000");
});