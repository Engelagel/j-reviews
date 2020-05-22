const Review = require('./Review');
const faker = require('faker');
const Promise = require('bluebird');
const db = require('./index');

var reviews = [];

var generateReviews = new Promise((resolve, reject) => {
  let n = 0;
  while (n < 100000) {
    reviews.push({
      product_id: n,
      review_id: Number('0' + n),
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
        id: n,
        url: faker.image.fashion()
      }],
      characteristics: {
        Size: faker.helpers.randomize(['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big']),
        Length: faker.helpers.randomize(['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']),
        Width: faker.helpers.randomize(['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']),
        Fit: faker.helpers.randomize(['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']),
        Comfort: faker.helpers.randomize(['Uncomfortable', 'Slightly uncomfortable', 'Okay', 'Comfortable', 'Perfect']),
        Quality: faker.helpers.randomize(['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'])
      }
    });
    n++;
  }
});

function insertReviews() {
  Review.insertMany(reviews, (err, docs) => {
    console.log(err || docs.length + ' reviews saved');
  });
};

insertReviews();