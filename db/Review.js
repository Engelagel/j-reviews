const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  product_id: Number,
  review_id: Number,
  rating: Number,
  summary: String,
  recommend: Number,
  response: String,
  body: String,
  date: Date,
  name: String,
  email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [{
    id: Number,
    url: String
  }],
  characteristics: {
    Size: String,
    Length: String,
    Width: String,
    Fit: String,
    Comfort: String,
    Quality: String
  }
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;