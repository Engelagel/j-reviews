const express = require('express');
const app = express();
const bp = require('body-parser');
const cors = require('cors');
const port = 3000;

app.use(bp.urlencoded({ extended: false}));
app.use(bp.json());
app.use(cors());

app.use(express.static(__dirname + '/../fec/dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/reviews/:productID/list', async (req, res) => res.send('GET = list of reviews'));

app.get('/reviews/:productID/meta', async (req, res) => res.send('GET = metadata of product'));

app.post('/reviews/:productID', async (req, res) => res.send('POST = posted new review'));

app.put('/reviews/helpful/:reviewID', async (req, res) => res.send('PUT = marked helpful'));

app.put('/reviews/report/:reviewID', async (req, res) => res.send('PUT = reported review'));

app.delete('/', async (req, res) => res.send('DELETE = deleted'));