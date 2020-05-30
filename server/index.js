const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Review = require('../db/Review');
const db = require('../db/index');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bp.urlencoded({ extended: false}));
app.use(bp.json());
app.use(cors());

app.use(express.static(__dirname + '/../fec/dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/reviews/:productID/list', (req, res) => {
  console.log('GET = list of reviews');
  Review.find({ product_id: req.params.productID })
    .then(data => res.status(200).send(data))
});

app.get('/reviews/:productID/meta', (req, res) => {
  console.log('GET = metadata of product');

});

app.post('/reviews/:productID', async (req, res) => {
  console.log('POST = posted new review');
  // await Review.create()
});

app.put('/reviews/helpful/:reviewID', async (req, res) => {
  console.log('PUT = marked helpful');
  await Review.findOneAndUpdate({ review_id: req.params.reviewID }, { $inc: { helpfulness: 1 } }, (err, doc) => {
    console.log(doc);
  })
  .then(data => res.status(201).send(data))
});

app.put('/reviews/report/:reviewID', async (req, res) => {
  console.log('PUT = reported review');
  await Review.findOneAndUpdate({ review_id: req.params.reviewID }, { reported: true }, (err, doc) => {
    console.log(doc);
  })
  .then(data => res.status(201).send(data))
});

app.delete('/', async (req, res) => {
  console.log('DELETE = deleted');

});