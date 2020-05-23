const Review = require('./Review');
const Product = require('./index');
const Promise = require('bluebird');
const now = require('performance-now');
// const products = require('./products.json');
const reviews = require('./reviews.json');

// function insertProducts() {
//   console.log('adding products at ' + now());
//   Product.insertMany(products, (err, docs) => {
//     console.log(err || docs.length + ' products saved at ' + now());
//   });
// };

//////// Insert from json file:
function insertReviews() {
  console.log('adding reviews at ' + now());
  Review.insertMany(reviews, (err, docs) => {
    console.log(err || docs.length + ' reviews saved at ' + now());
  });
};

// insertProducts();
insertReviews();




/*  ////// Insert from csv file:
const fs = require('fs');
const es = require('event-stream');
const csv = require('csv-parser');
const reviews = [];

function insertReviews() {
  console.log(now());
  fs.createReadStream('./db/reviews.csv')
    .pipe(es.split())
    .pipe(csv())
    .pipe(es.parse())
    .pipe(es.through(
      function write(data) {
        this.emit('data', data)
      },
      function end () {
        this.emit('end')
      })
    )
    .on('end', () => {
      Review.insertMany(reviews, (err, docs) => {
        console.log(err || docs.length + ' reviews saved at ' + now());
      })
    })
};
*/