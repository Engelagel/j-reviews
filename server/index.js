require('newrelic');
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('../db');
const handle = require('./controllers');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bp.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/products/list', handle.getProducts);

app.get('/reviews/:product/list', handle.getList);

app.get('/reviews/:product/meta', handle.getMeta);

app.post('/reviews/:product', handle.newReview);

app.put('/reviews/helpful/:reviewID', handle.markHelpful);

app.put('/reviews/report/:reviewID', handle.reportRev);

app.delete('/reviews/delete/:reviewID', handle.deleteRev);