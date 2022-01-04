const { statusCode, responseMessage } = require('../globals');
const encryption = require('../libs/encryption.js');
const jwt = require('../libs/jwt.js');
const { resFormatter } = require('../utils');
const { ValidationError, DuplicatedError, PasswordMissMatchError, NotMatchedUserError } = require('../utils/errors/userError');

const userService = require('../services/userService.js');
const logger = require('../utils/logger');


//회원가입
exports.postUser = async (req, res, next) => {
  try {
      const { email, password, nickName} = req.body;
    
    //입력값 확인
    if (email === undefined || password === undefined || nickName === undefined) {
      throw new ValidationError();
    }

    //이메일 중복 여부
    const isEmail = await userService.checkEmail(email);
    if (isEmail) throw new DuplicatedError()

    //암호화
    // const salt = encryption.makeSalt();
    console.log(password)
    const encryptPassword = (await encryption.encrypt(password)).toString();
    console.log(password, encryptPassword)

    //쿼리실행
    await userService.signup(email, encryptPassword, nickName);
    

    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATED_USER));
  } catch (err) {
    next(err);
  }
}


//토큰 생성(로그인)
exports.postToken = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //입력값 확인
    if (email === undefined || password === undefined) throw new ValidationError();

    //이메일 존재 여부
    const isEmail = await userService.checkEmail(email);
    if (!isEmail) throw new NotMatchedUserError();

    //쿼리 실행
    const user = await userService.signin(email, password);
    if (!user) {
      throw new PasswordMissMatchError();
    }
    //토큰 반환
    const { accessToken } = await jwt.sign(user);

    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.LOGIN_SUCCESS, { accessToken }))
  } catch (err) {
    next(err);
  }
}