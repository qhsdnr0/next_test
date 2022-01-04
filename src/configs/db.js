const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  dbDATABASE: process.env.NEXT_DATABASE,
  dbUSERNAME: process.env.NEXT_USER,
  dbPASSWORD: process.env.NEXT_PASSWORD,
  dbHOSTNAME: process.env.NEXT_HOST,
  dbPORT: process.env.NEXT_PORT,
};
