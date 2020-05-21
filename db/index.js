const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose cxn err: '));
db.once('open', () => console.log('Mongoose cxn successful'));

var reviewSchema = new mongoose.Schema({
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

// var productSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   features: [
//     {
//       feature: String,
//       value: String
//     }
//   ]
// });