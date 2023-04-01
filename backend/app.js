const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const {
  login,
  createUser,
} = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const constants = require('./utils/constants');

const app = express();
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://gamecattt.nomoredomains.work',
  'http://gamecattt.nomoredomains.work',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', "*");
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(constants.URL_REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { code = 500, message } = err;

  res.status(code).send({
    message: code === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(3000);
