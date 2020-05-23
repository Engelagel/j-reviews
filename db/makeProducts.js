const faker = require('faker');
const Promise = require('bluebird');
const fs = require('fs');
const now = require('performance-now');

var products = [];

var generateProducts = new Promise((resolve, reject) => {
  let n = 1;
  while (n <= 10000) {
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
  if (products.length === 10000) {
    resolve('10k products generated');
  }
});

let fakeProducts = Promise.resolve(generateProducts);

let json = fs.createWriteStream('db/products.json');

function makeProducts() {
  console.log(now());
  fakeProducts.then((value) => {
    json.write(JSON.stringify(products, null, 2) + ',\n', (err) => {
      console.log(err || 'products made');
    });
  }).then(console.log(now()));
};

makeProducts();