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
  fs.createReadStream('./db/reviews.json')
    .pipe(es.split())
    .pipe(es.parse())
    .pipe(es.through(
      function write(data) {
        Review.insertMany(data, (err, docs) => {
          console.log(err || docs.length + ' reviews saved at ' + now());
        })
      },
      function end () {
        this.emit('end')
      })
    )
};

// insertProducts();
insertReviews();




/*  ////// Insert from csv file:
const fs = require('fs');
const es = require('event-stream');
const csv = require('csv-parser');
const reviews = [];

  Review.insertMany(reviews, (err, docs) => {
    console.log(err || docs.length + ' reviews saved at ' + now());
  });

function insertReviews() {
  console.log(now());

};
*/