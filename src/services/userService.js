const { Op } = require("sequelize");
const User = require('../models').user;

// /**
//  * 회원가입 서비스
//  * @param {String} email
//  * @param {String} password
//  * @param {String} nickName
//  * @returns {Object} 가입한 유저 정보 { email, password, nickName }
//  */
exports.signup = async (
  email,
  password,
  nickName,
) => {
  try {
    // console.log(1);
    const newUser = await User.create({
      email: email,
      password: password,
      nickName: nickName,
    });
    console.log(1);
    return newUser;
  } catch (err) {
    throw err;
  }
};

// /**
//  * 이메일 체크 서비스
//  * @param {String} email
//  * @returns {Object} 
//  */
exports.checkEmail = async (email) => {
  try {
    console.log(1);
    const alreadyUser = await User.findOne({
      where: {
        email
      }
    });
    console.log(1);
    return alreadyUser;
  } catch (err) {
    throw err;
  }
};

/**
 * 로그인 서비스
 * @param {String} emailUsername
 * @param {String} emailDomain
 * @param {String} password
 * @returns {Object} 로그인한 유저 정보 { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.signin = async (emailUsername, emailDomain, password) => {
  try {
    const user = await models.user.findOne({
      where: {
        [Op.and]: [
          { username: emailUsername },
          { domain: emailDomain },
          { password: password }
        ],
      },
    });
    return user.dataValues;
  } catch (err) {
    throw err;
  }
};

// exports.updateRefreshToken = async (emailUsername, emailDomain, refreshToken) => {
//   try {

//     return user;
//   } catch (err) {
//     throw err;
//   }
// }
