const { connect, connection, Schema, model } = require('mongoose');

const options = { connectTimeoutMS: 60000000, keepAlive: 60000000, serverSelectionTimeoutMS: 60000000,
  useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true };

connect('mongodb://localhost/sdc', options).catch(err => console.log(err.reason));

var db = connection;
db.on('error', console.error.bind(console, 'Mongoose cxn err: '));
db.once('open', () => console.log('Mongoose cxn successful'));

var productSchema = new Schema({
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

var Product = model('Product', productSchema);

module.exports = Product;