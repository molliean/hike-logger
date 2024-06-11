const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Trip = require('../models/trip.js');

router.get('/', async function index(req, res) {
    try {
        const user = await User.findById(req.session.user._id).populate('hikeLog trips');
        res.render('home/index.ejs', { hikes: user.hikeLog, trips: user.trips });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;