const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// index route
router.get('/', async function index(req, res) {
    try {
        const user = await User.findById(req.session.user._id).populate('hikeLog');
        res.render('hikes/index.ejs', { hikes: user.hikeLog });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// create route: first GET form, then POST form
router.get('/new', async function newHike(req, res) {
    const user = await User.findById(req.session.user._id).populate('hikeLog');
    res.render('hikes/new.ejs');
});

router.post('/', async function create(req, res) {
    const hike = {
        trailName: req.body.trailName,
        dateHiked: req.body.dateHiked,
        location: req.body.location,
        distance: req.body.distance,
        elevationGain: req.body.elevationGain,
        difficulty: req.body.difficulty,
        routeType: req.body.routeType,
        favorite: req.body.favorite === 'on',
    };
    console.log('Form data:', req.body); // Log form data to debug

    try {
        const user = await User.findById(req.session.user._id);
        user.hikeLog.push(hike);
        await user.save();
        res.redirect('/hikes');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// show route
router.get('/:id', async function show(req, res) {
    try {
        const user = await User.findById(req.session.user._id);
        const hike = user.hikeLog.id(req.params.id);
        // const hike = await Hike.findById(req.params.id);
        res.render('hikes/show.ejs', { hike });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// edit route
router.get('/:id/edit', async function edit(req, res) {
    try {
        const user = await User.findById(req.session.user._id);
        const hike = user.hikeLog.id(req.params.id);
        res.render('hikes/edit.ejs', { hike });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//update route
router.put('/:id', async function update(req, res) {
    try {
        const user = await User.findById(req.session.user._id);
        const hike = user.hikeLog.id(req.params.id);
        hike.trailName = req.body.trailName;
        hike.dateHiked = req.body.dateHiked;
        hike.location = req.body.location;
        hike.distance = req.body.distance;
        hike.elevationGain = req.body.elevationGain;
        hike.difficulty = req.body.difficulty;
        hike.routeType = req.body.routeType;
        hike.favorite = req.body.favorite === 'on';
        await user.save();
        res.redirect('/hikes');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// delete route
router.delete('/:id', async function deleteHike(req, res) {
    try {
        const user = await User.findById(req.session.user._id);
        +        user.hikeLog.id(req.params.id).deleteOne();
        await user.save();
        res.redirect('/hikes');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;