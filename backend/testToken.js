const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjMWE0ZGY5NGZhNmI3MzljZjE5MDgiLCJpYXQiOjE2ODA2MTE5MzEsImV4cCI6MTY4MTIxNjczMX0.2qodSQJTloBOtp7sjaJ-wkzAE_SsA4pAPZvrABzG6LA'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'a2175b93e0227437d22d7cdf64ad93bb'; // вставьте сюда секретный ключ для разработки из кода
try {
  jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `Надо исправить. В продакшне используется тот же секретный ключ, что и в режиме разработки.`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log('\x1b[32m%s\x1b[0m', 'Всё в порядке. Секретные ключи отличаются');
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
  }
}
