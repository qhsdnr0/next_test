const Sequelize = require("sequelize");
const configs = require('../configs');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const sequelize = new Sequelize(
  configs.db.dbDATABASE,
  configs.db.dbUSERNAME,
  configs.db.dbPASSWORD,
  {
    host: configs.db.dbHOSTNAME,
    port: configs.db.dbPORT,
    dialect: 'mysql',
    logging: false,
  },
);

const db = {};
// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes,
//     );
//     db[model.name] = model;
//   });


// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.content = require("./content")(sequelize, Sequelize);

//DB연결
// const connectDB = async () => {
//   try {
//     await db.sequelize.authenticate();
//     await db.sequelize.sync({ alter: true });
//     logger.log('MySQL connected ...');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// (async () => {
//   await connectDB();
// })();



module.exports = db;
