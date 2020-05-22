const Product = require('./index');
const faker = require('faker');
const Promise = require('bluebird');

var products = [];

var generateProducts = new Promise((resolve, reject) => {
  let n = 0;
  while (n < 10000000) {
    products.push(
      {
        product_id: n,
        name: faker.random.words(2),
        slogan: faker.random.words(4),
        description: faker.random.words(15),
        category: faker.random.words(1),
        default_price: faker.random.number(200),
        features: [
          {
            feature: faker.random.words(1),
            value: faker.random.words(2)
          }
        ]
      }
    );
    n++;
  }
});

function insertProducts() {
  Product.insertMany(products, (err, docs) => {
    console.log(err || docs.length + ' products saved');
  });
};

insertProducts();