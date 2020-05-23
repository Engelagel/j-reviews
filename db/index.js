const mongoose = require('mongoose');
const now = require('performance-now');

mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 6000000 }).catch(err => console.log(err.reason));;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose cxn err: '));
db.once('open', () => console.log('Mongoose cxn successful at ' + now()));

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