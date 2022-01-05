const { Op } = require("sequelize");
const User = require('../models').user;
const encryption = require('../libs/encryption.js');

exports.signup = async (
  email,
  password,
  nickName,
) => {
  try {
    const newUser = await User.create({
      email: email,
      password: password,
      nickName: nickName,
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

exports.checkEmail = async (email) => {
  try {
    const alreadyUser = await User.findOne({
      where: {
        email
      }
    });
    return alreadyUser;
  } catch (err) {
    throw err;
  }
};

exports.signin = async (email, password) => {
    try {
        const user = await User.findOne({
            where: {
            email
            },
        });

    
        const hashedPassword = user.password;
        if (await encryption.checkPw(password, hashedPassword)) {
            return user.dataValues;
        } else {
            return false;
        }        
    
    } catch (err) {
    throw err;
    }
};
