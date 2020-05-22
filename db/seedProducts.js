const Product = require('./index');
const faker = require('faker');
const Promise = require('bluebird');

var products = [];

var generateProducts = new Promise((resolve, reject) => {
  let n = 0;
  while (n < 10) {
    products.push(
      {
        product_id: n,
        name: faker.commerce.productName(),
        slogan: faker.company.catchPhrase(),
        description: faker.random.words(15),
        category: faker.commerce.department(),
        default_price: faker.commerce.price(),
        features: [
          {
            feature: faker.random.words(1),
            value: faker.commerce.productMaterial()
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