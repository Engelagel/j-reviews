const faker = require('faker');
const fs = require('fs');

function generateReviews() {
  let n = 5523747;
  while (n <= 10000000) {
    let review = {
      product_id: n,
      review_id: Number('3' + n),
      rating: faker.random.number(5),
      summary: faker.random.words(7),
      recommend: faker.random.number(1),
      response: faker.random.words(6),
      body: faker.random.words(17),
      date: faker.date.past(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      helpfulness: faker.random.number(10),
      photos: [{
        id: Number('3' + n),
        url: faker.image.fashion()
      }],
      characteristics: {
        Size: faker.random.number(5),
        Length: faker.random.number(5),
        Width: faker.random.number(5),
        Fit: faker.random.number(5),
        Comfort: faker.random.number(5),
        Quality: faker.random.number(5)
      }
    };
    n++;
    fs.writeFileSync('C:/Users/Jackson/Documents/Hack Reactor/SDC/reviews5523747.csv', JSON.stringify(review), { flag: 'as' });
    if (n % 100000 === 0) console.log(n + ' reviews written');
  }
};

generateReviews();