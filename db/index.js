const mongoose = require('mongoose');
const now = require('performance-now');

const options = { connectTimeoutMS: 60000000, keepAlive: 60000000, serverSelectionTimeoutMS: 60000000,
  useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect('mongodb://localhost/sdc', options).catch(err => console.log(err.reason));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose cxn err: '));
db.once('open', () => console.log('Mongoose cxn successful'));

var productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      feature: String,
      value: String
    }
  ]
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;