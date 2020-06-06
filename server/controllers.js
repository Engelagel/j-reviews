const Product = require('../db');
const Review = require('../db/Review');

exports.getProducts = async (req, res) => {
  console.log('GOT list of products');
  await Product.find({ })     //.limit(50)
    .then(data => res.status(200).send(data))
};

exports.getList = async (req, res) => {
  console.log('GOT list of reviews');
  await Review.find({ product: req.params.product })
    .then(data => {
      const result = {
        product: req.params.product,
        page: 0,
        count: data.length,
        results: []
      }
      for (let i = 0; i < data.length; i++) {
        result.results.push(
          {
            review_id: data[i].review_id,
            rating: data[i].rating,
            summary: data[i].summary,
            recommend: data[i].recommend,
            response: data[i].response,
            body: data[i].body,
            date: data[i].date,
            reviewer_name: data[i].name,
            helpfulness: data[i].helpfulness,
            photos: data[i].photos
          }
        )
        if (i === data.length - 1) {
          res.status(200).send(result)
        }
      }
    })
};

exports.getMeta = async (req, res) => {
  console.log('GET = metadata of product');
  await Review.find({ product: req.params.product }, { product: 1, rating: 1, recommend: 1, characteristics: 1 })
  .then(data => {
    const result = {
      product_id: req.params.product,
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      recommended: {
        0: 0,
        1: 0
      },
      characteristics: {
        Size: {
          id: 14,
          value: 0
        },
        Width: {
          id: 15,
          value: 0
        },
        Comfort: {
          id: 16,
          value: 0
        }
      }
    };
    let size = result.characteristics.Size.value;
    let width = result.characteristics.Width.value;
    let comfort = result.characteristics.Comfort.value;

    for (let i = 0; i < data.length; i++) {
      let review = data[i];

      // tally star ratings
      if (review.rating === 1) {
        result.ratings[1]++
      }
      else if (review.rating === 2) {
        result.ratings[2]++
      }
      else if (review.rating === 3) {
        result.ratings[3]++
      }
      else if (review.rating === 4) {
        result.ratings[4]++
      }
      else if (review.rating === 5) {
        result.ratings[5]++
      }

      // tally recommendations
      if (review.recommend === 0) {
        result.recommended[0]++
      }
      else if (review.recommend === 1) {
        result.recommended[1]++
      }

      // tally & average characteristic ratings
      size = size + Number(review.characteristics[14]);
      width = width + Number(review.characteristics[15]);
      comfort = comfort + Number(review.characteristics[16]);
      if (i === data.length - 1) {
        result.characteristics.Size.value = (size/data.length).toFixed(4);
        result.characteristics.Width.value = (width/data.length).toFixed(4);
        result.characteristics.Comfort.value = (comfort/data.length).toFixed(4);
        res.status(200).send(result)
      }
    }
  })
};

exports.newReview = async (req, res) => {
  console.log('POST = posted new review');
  const newRev = new Review(req.body);
  await newRev.save()
  .then(data => res.status(201).send(data))
};

exports.markHelpful = async (req, res) => {
  console.log('PUT = marked helpful');
  await Review.findOneAndUpdate({ review_id: req.params.reviewID }, { $inc: { helpfulness: 1 } }, (err, doc) => {
    console.log(doc);
  })
  .then(data => res.status(204).send(data))
};

exports.reportRev = async (req, res) => {
  console.log('PUT = reported review');
  await Review.findOneAndUpdate({ review_id: req.params.reviewID }, { reported: true }, (err, doc) => {
    console.log(doc);
  })
  .then(data => res.status(204).send(data))
};

exports.deleteRev = async (req, res) => {
  console.log('DELETE = deleted');
  await Review.findOneAndDelete({ review_id: req.params.reviewID}, (err, doc) => {
    console.log(doc);
  })
  .then(() => res.status(200).send('review ' + req.params.reviewID + ' deleted'))
};