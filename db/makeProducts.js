const faker = require('faker');
const fs = require('fs');

function generateProducts() {
  let n = 1000001;
  while (n <= 10000000) {
    let product = {
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
    n++;
    fs.writeFileSync('db/products.json', JSON.stringify(product), { flag: 'as' });
    if (n % 100000 === 0) console.log(n + ' products made');
  }
};

generateProducts();