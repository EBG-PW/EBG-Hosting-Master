const express = require('express');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const helmet = require('helmet');
const cors = require('cors');
var path = require('path');
const bodyParser = require('body-parser');


require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.set('trust proxy', 1); //If Behind PROXY

//app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(expressCspHeader({
  directives: {
      'default-src': [SELF, 'https://fonts.gstatic.com/s/montserrat/v18/'],
      'script-src': [SELF, INLINE, 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', 'https://unpkg.com/new-i18n@3.0.0-5/lib/index.js'],
      'style-src': [SELF, INLINE, ' https://fonts.googleapis.com/css'],
      'img-src': [SELF, INLINE],
      'worker-src': [NONE],
      'block-all-mixed-content': true
  }
}));
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', express.static('public'));

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
