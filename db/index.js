const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose cxn err: '));
db.once('open', () => console.log('Mongoose cxn successful'));

var productSchema = new mongoose.Schema({
  id: Number,
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