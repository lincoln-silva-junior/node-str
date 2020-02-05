// PACKAGES *******************

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

// ****************************

// APPLICATION INIT
const app = express();
const router = express.Router();

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MODELS
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// ROUTES
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

// DATABASE
mongoose.connect(config.connectionString
                , { useNewUrlParser: true,  useUnifiedTopology: true });

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;