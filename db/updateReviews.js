const faker = require('faker');
const fs = require('fs');

function updateReviews() {
  let n = 11933988;
  while (n <= 25000000) {
    let review = {
      product: faker.random.number(10000000),
      review_id: n,
      rating: faker.random.number(5),
      summary: faker.random.words(7),
      body: faker.random.words(17),
      recommend: faker.random.number(1),
      date: faker.date.past(),
      reviewer_name: faker.internet.userName(),
      email: faker.internet.email(),
      photos: [faker.image.fashion()],
      characteristics: {
        14: faker.random.number(5),
        15: faker.random.number(5),
        16: faker.random.number(5)
      },
      response: faker.random.words(6),
      helpfulness: faker.random.number(10),
      reported: false
    };
    n++;
    fs.writeFileSync('C:/Users/Jackson/Documents/Hack Reactor/SDC/reviewsNew1.csv', JSON.stringify(review), { flag: 'as' });
    if (n % 100000 === 0) console.log(n + ' reviews written');
  }
};

updateReviews();