const { date } = require("faker");
const { Op } = require("sequelize");
const models = require('../models');

/**
 * 회원가입 서비스
 * @param {String} userEmail
 * @param {String} userPassword
 * @param {String} userNickName
 * @param {Date} userLoginAt
 * @param {Date} userCreatedAt
 * @returns {Object} 
 */
exports.signup = async (
  userEmail,
  userPassword,
  userNickName,
  userLoginAt,
  userCreatedAt,
) => {
  try {
    const newUser = await models.user.create({
      email: userEmail,
      password: userPassword,
      nickname: userNickName,
      loginAt,
      createdAt,
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

/**
 * 이메일 체크 서비스
 * @param {String} emailUsername
 * @param {String} emailDomain
 * @returns {Object} 이미 존재하는 유저 정보 { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.checkEmail = async (userEmail) => {
  try {
    const alreadyUser = await models.user.findOne({
      where: {
        [Op.and]: [
          { email: userEmail }
        ]
      }
    });
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
