const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

//Code : 400 Request Body 누락 
class ValidationError extends Error {
  constructor(message = responseMessage.NULL_VALUE, status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
}

//Code : 404 contentId에 해당하는 콘텐츠가 존재하지 않음

class NotMatchedPostError extends Error {
  constructor(message = responseMessage.NO_CONTENT, status = statusCode.NOT_FOUND) {
    super(message);
    this.status = status;
  }
}

//Code : 401 jwt 미인증

class UnAuthorizedError extends Error {
  constructor(message = responseMessage.PERMISSION_ERROR, status = statusCode.UNAUTHORIZED) {
    super(message);
    this.status = status;
  }
}

module.exports.ValidationError = ValidationError;
module.exports.NotMatchedPostError = NotMatchedPostError;
module.exports.UnAuthorizedError = UnAuthorizedError;

