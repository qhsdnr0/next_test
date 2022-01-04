const crypto = require('crypto');
const bcrypt = require('bcrypt');
const SALTROUND = 10;

module.exports = {
    //salt 생성
    // makeSalt: () => {
    //     return crypto.randomBytes(32).toString('hex');
    // },

    //암호화
    encrypt: async (password) => {
    //     const key = crypto.pbkdf2Sync(password, salt.toString(), 100000, 32, 'sha512');
    //     return key.toString('hex');
        // const salt = bcrypt.genSalt(SALTROUND);
        return bcrypt.hashSync(password, SALTROUND);
        
    },

    //비밀번호 확인
    checkPw: async (password, hashedPassword) => {
        return bcrypt.compareSync(password, hashedPassword);
    }
};
