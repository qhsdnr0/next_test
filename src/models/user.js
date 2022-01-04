module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    email: { type: DataTypes.STRING, primaryKey: true, unique:true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    nickName: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    loginAt: { type: DataTypes.DATE },
  });

  return user;
};
