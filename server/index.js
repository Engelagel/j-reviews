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

});

app.put('/reviews/helpful/:reviewID', async (req, res) => {
  console.log('PUT = marked helpful');

});

app.put('/reviews/report/:reviewID', async (req, res) => {
  console.log('PUT = reported review');

});

app.delete('/', async (req, res) => {
  console.log('DELETE = deleted');

});