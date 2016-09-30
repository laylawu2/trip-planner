var express = require('express');
var router = express.Router();
var models = require('../models')
var Hotel = models.hotel;
var Restaurant = models.restaurant;
var Activity = models.activity;

router.get('/', function(req, res) {
var data = {};
  Hotel.findAll()
    .then (function(dbHotels){
      data.hotels = dbHotels;
      return Restaurant.findAll()
    })
    .then (function(dbRestaurants) {
      data.restaurants = dbRestaurants;
      return Activity.findAll()
    })
    .then (function(dbActivities){
      data.activities = dbActivities
    })
    .then (function() {
      res.render('index.html', {
      hotels: data.hotels,
      restaurants: data.restaurants,
      activities: data.activities
       })
    })


})

module.exports = router;
