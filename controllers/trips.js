const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trip = require('../models/trip.js');
const User = require('../models/user.js');


// index route
router.get('/', async function index(req, res) {
    try {
        const user = await User.findById(req.session.user._id).populate('trips');
        res.render('trips/index.ejs', { trips: user.trips });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// create route: first GET form, then POST form
router.get('/new', async function newTrip(req, res) {
    try {
        const user = await User.findById(req.session.user._id).populate('hikeLog');
        res.render('trips/new.ejs', { hikes: user.hikeLog });
    } catch (error) {
        console.log(error);
        res.redirect('/trips');
    }
});

router.post('/', async function create(req, res) {
    try {
        const user = await User.findById(req.session.user._id);
        let hikes = [];
        if (req.body.hikes) {
            hikes = Array.isArray(req.body.hikes) ? req.body.hikes.map(id => new mongoose.Types.ObjectId(id)) : [new mongoose.Types.ObjectId(req.body.hikes)];
        }
        const trip = new Trip({
            tripName: req.body.tripName,
            description: req.body.description,
            tripDuration: req.body.tripDuration,
            hikes: hikes,
            user: req.session.user._id,
        });
        console.log(trip);
        await trip.save();
        user.trips.push(trip);
        await user.save();
        res.redirect('/trips');
    } catch (error) {
        console.log(error);
        res.redirect('/trips/new');
    }
});

// show route
router.get('/:id', async function show(req, res) {
    try {
        const user = await User.findById(req.session.user._id).populate('hikeLog');
        const trip = await Trip.findById(req.params.id);
        const hikes = user.hikeLog.filter(hike => trip.hikes.includes(hike._id));
        res.render('trips/show.ejs', { hikes, trip });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// edit route
router.get('/:id/edit', async function edit(req, res) {
    try {
        const user = await User.findById(req.session.user._id);
        const trip = await Trip.findById(req.params.id);
        res.render('trips/edit.ejs', { trip, hikes: user.hikeLog });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// update route
router.put('/:id', async function update(req, res) {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/trips/${trip._id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// delete route
router.delete('/:id', async function deleteTrip(req, res) {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        res.redirect('/trips');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;