const Review = require('./Review');
const faker = require('faker');
const Promise = require('bluebird');
const db = require('./index');

var reviews = [];

var generateReviews = new Promise((resolve, reject) => {
  let n = 0;
  while (n < 10) {
    reviews.push({
      product_id: n,
      review_id: n,
      rating: faker.random.number(5),
      summary: faker.random.words(7),
      recommend: faker.random.number(1),
      response: faker.random.words(6),
      body: faker.random.words(17),
      date: Date,
      name: faker.internet.userName,
      email: faker.internet.email,
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
    })
  }
});

function insertReviews() {
  Review.insertMany(reviews, (err, docs) => {
    console.log(err || docs.length + ' reviews saved');
  });
};

insertReviews();