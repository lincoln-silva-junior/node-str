// PACKAGES *******************

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// ****************************

// APPLICATION INIT
const app = express();
const router = express.Router();

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

// DATABASE
mongoose.connect('mongodb://jlincoln:ioNDaRa59@ds054619.mlab.com:54619/node-str'
                , { useNewUrlParser: true,  useUnifiedTopology: true });

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;