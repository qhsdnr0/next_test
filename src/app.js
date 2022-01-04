const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const { logger, resFormatter } = require('./utils');


//DB연결

//서버 사전작업
const app = express();

//미들웨어 설정
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// 아래는 에러 핸들링 함수들
app.use(function (req, res, next) {
  throw new NoPageError();
});

app.use(function (err, req, res, next) {
  let errCode = err.status || statusCode.INTERNAL_SERVER_ERROR;
  let message = errCode == statusCode.INTERNAL_SERVER_ERROR ? responseMessage.INTERNAL_SERVER_ERROR : err.message;

  if (req.app.get('env') == "development") logger.err(err);

  return res.status(errCode)
    .send(resFormatter.fail(message));
});

module.exports = app;
