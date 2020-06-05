const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  product: Number,
  review_id: Number,
  rating: Number,
  summary: String,
  body: String,
  recommend: Number,
  date: Date,
  reviewer_name: String,
  email: String,
  photos: [String],
  characteristics: {
    14: String,
    15: String,
    16: String
  },
  response: String,
  helpfulness: Number,
  reported: Boolean
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;