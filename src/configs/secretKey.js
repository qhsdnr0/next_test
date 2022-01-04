const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  secretKey: process.env.NEXT_SECRET_KEY,
  options: {
    algorithm: process.env.NEXT_ALGORITHM,
    expiresIn: '7d',
    issuer: 'const'
  },
  refreshOptions: {
    algorithm: process.env.NEXT_ALGORITHM,
    expiresIn: '14d',
    issuer: 'const'
  }
};
